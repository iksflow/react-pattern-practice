import { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo as TodoType } from '@/types/todo';
import { AppServerClient } from '@/utils/AppServerClient';

const appServerClient = AppServerClient.getInstance();
const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    appServerClient.getTodos().then((todos) => setTodos(todos));
  }, []);

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
  //   useEffect(() => {
  //     async function fetchTodos() {
  //       // 1단계: 네트워크 요청 완료 대기
  //       const response = await fetch(
  //         'https://jsonplaceholder.typicode.com/todos',
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );

  //       // 2단계: JSON 파싱 완료 대기
  //       const data = await response.json();

  //       // 파싱된 데이터 사용
  //       setTodos(data);
  //     }

  //     fetchTodos().catch((error) => console.error(error));
  //   }, []);

  //  2. fetch todos using axios
  //   useEffect(() => {
  //     axios
  //       .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  //       .then((response) => setTodos(response.data));
  //   }, []);

  // 3. fetch todos using axios improved
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

export default Todo;
