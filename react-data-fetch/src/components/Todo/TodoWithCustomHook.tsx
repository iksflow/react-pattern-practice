import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types/todo';

interface TodoWithCustomHookProps {
  todos: Todo[];
  onClick: (id: number) => void;
}

const TodoWithCustomHook = ({ todos, onClick }: TodoWithCustomHookProps) => {
  return (
    <div className="">
      {todos.map((todo) => (
        <div key={todo.id} onClick={() => onClick(todo.id)}>
          <span>
            {todo.id}: {todo.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodoWithCustomHook;
