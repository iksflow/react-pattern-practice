import React from 'react';
import TodoListItem from './TodoListItem';
import { selectTodos } from './todosSlice';
import { useSelector } from 'react-redux';

const TodoList = () => {
  const todos = useSelector(selectTodos);

  const renderedListItems = todos.map((todo) => {
    return <TodoListItem key={todo.id} todo={todo} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
