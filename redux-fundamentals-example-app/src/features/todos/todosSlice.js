import { client } from '../../api/client';

const initialState = [];

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ];
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        // If this isn't the todo item we're looking for, leave it alone
        if (todo.id !== action.payload) {
          return todo;
        }

        // We've found the todo that has to change. Return a copy:
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    }
    default:
      return state;
  }
}

// Thunk function
export async function fetchTodos(dispatch, getState) {
  const response = await client.get('/fakeApi/todos');
  dispatch({ type: 'todos/todosLoaded', payload: response.todos });
}
export const selectTodoById = (state, todoId) =>
  state.todos.find((todo) => todo.id === todoId);
export const selectTodos = (state) => state.todos;
export const selectTodoIds = (state) => state.todos.map((todo) => todo.id);
