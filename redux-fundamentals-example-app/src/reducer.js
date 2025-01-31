import todosReducer from './features/todos/todoSlice';
import filtersReducer from './features/filters/filterSlice';

// Use the initialState as a default value
export default function rootReducer(state = {}, action) {
  return {
    todos: todosReducer(state.todos, action),
    filters: filtersReducer(state.filters, action),
  };
}
