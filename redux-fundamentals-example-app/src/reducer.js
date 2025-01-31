import todosReducer from './features/todos/todoSlice';
import filtersReducer from './features/filters/filterSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

export default rootReducer;
