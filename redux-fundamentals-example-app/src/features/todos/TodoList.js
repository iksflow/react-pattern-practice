import React from 'react';
import TodoListItem from './TodoListItem';
import { selectTodoIds, selectFilteredTodoIds } from './todosSlice';
import { useSelector, shallowEqual } from 'react-redux';

const TodoList = () => {
  // const todoIds = useSelector(selectTodoIds, shallowEqual);
  const todoIds = useSelector(selectFilteredTodoIds);
  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
