import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { AppServerClient } from '@/utils/AppServerClient';

const appServerClient = AppServerClient.getInstance();
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await appServerClient.get('/todos');
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { todos, isLoading, error };
};
