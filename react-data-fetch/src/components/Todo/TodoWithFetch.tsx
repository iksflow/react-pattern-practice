import { useEffect, useState } from 'react';
import { Todo } from '@/types/todo';

const TodoWithFetch = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  //  1. fetch todos using fetch api
  //   useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/todos', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setTodos(data))
  //       .catch((error) => console.error(error));
  //   }, []);
  // 1. fetch todos using fetch api improved
  useEffect(() => {
    async function fetchTodos() {
      // 1단계: 네트워크 요청 완료 대기
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // 2단계: JSON 파싱 완료 대기
      const data = await response.json();

      // 파싱된 데이터 사용
      setTodos(data);
    }

    fetchTodos().catch((error) => console.error(error));
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

export default TodoWithFetch;
