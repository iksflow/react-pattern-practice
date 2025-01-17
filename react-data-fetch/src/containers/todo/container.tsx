import TodoWithCustomHook from '@/components/Todo/TodoWithCustomHook';
import { useTodos } from '@/hooks/useTodos';
import Todo from '@/components/Todo/Todo';

const TodoContainer = () => {
  const { todos, isLoading, error } = useTodos();
  const onClick = (id: number) => {
    console.log(id);
  };

  //   return <TodoWithCustomHook todos={todos} onClick={onClick} />;
  return <Todo />;
};

export default TodoContainer;
