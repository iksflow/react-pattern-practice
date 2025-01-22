import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store.ts';
import { decrement, increment } from '@/features/counter/counterSlice.ts';

const CounterWithReduxToolkit = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};
export default CounterWithReduxToolkit;
