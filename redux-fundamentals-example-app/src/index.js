import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import './api/server';
import store from './store';
import { fetchTodos } from './features/todos/todosSlice';

store.dispatch(fetchTodos);

console.log('Dispatching action');
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' });
console.log('Dispatch complete');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
