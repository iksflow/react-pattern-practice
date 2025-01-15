import { useQuery } from '@tanstack/react-query';
import { Todo } from '@/types/todo';

const TodoWithReactQuery = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다!</div>;

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Todo List (React Query)</h1>
      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center p-2 border rounded hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="mr-2"
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoWithReactQuery;
