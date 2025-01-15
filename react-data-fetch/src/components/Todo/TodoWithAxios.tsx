import { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '@/types/todo';

const TodoWithAxios = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  //  2. fetch todos using axios
  useEffect(() => {
    axios
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .then((response) => setTodos(response.data));
  }, []);

  return (
    <div className="">
      {todos.map((todo) => (
        <div key={todo.id}>
          <span>
            {todo.id}: {todo.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodoWithAxios;
