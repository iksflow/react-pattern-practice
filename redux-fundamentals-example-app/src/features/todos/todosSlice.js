import { client } from '../../api/client';
import { createSelector } from 'reselect';
import { StatusFilters } from '../filters/filtersSlice';

const initialState = {
  status: 'idle',
  entities: [],
};

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return {
        ...state,
        entities: [...state.entities, action.payload],
      };
    }
    case 'todos/todoToggled': {
      return {
        ...state,
        entities: state.entities.map((todo) => {
          if (todo.id !== action.payload) {
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };
    }
    case 'todos/todosLoading': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'todos/todosLoaded': {
      return {
        ...state,
        status: 'idle',
        entities: action.payload,
      };
    }
    default:
      return state;
  }
}

// Thunk function
export function fetchTodos() {
  return async (dispatch, getState) => {
    dispatch(todosLoading());
    const response = await client.get('/fakeApi/todos');
    dispatch(todosLoaded(response.todos));
  };
}

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text };
    const response = await client.post('/fakeApi/todos', { todo: initialTodo });

    dispatch(todoAdded(response.todo));
  };
}

const selectTodos = (state) => state.todos.entities;

export const selectTodoById = (state, todoId) =>
  state.todos.entities.find((todo) => todo.id === todoId);

export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTodos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id)
);

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters;
    const showAllCompletions = status === StatusFilters.All;
    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);

export const todoAdded = (todo) => {
  return {
    type: 'todos/todoAdded',
    payload: todo,
  };
};

export const todosLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  };
};

export const todosLoading = () => {
  return {
    type: 'todos/todosLoading',
  };
};
