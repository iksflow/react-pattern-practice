import React from 'react';
import TodoListItem from './TodoListItem';
import { selectTodoIds, selectFilteredTodoIds } from './todosSlice';
import { useSelector, shallowEqual } from 'react-redux';

const TodoList = () => {
  // const todoIds = useSelector(selectTodoIds, shallowEqual);
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }
  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
