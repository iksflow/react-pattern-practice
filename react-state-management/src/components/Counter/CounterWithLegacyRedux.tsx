import { useState } from 'react';
import store from './LegacyReduxReducer';
const CounterWithLegacyRedux = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Counter With UseState</h1>
      <p className="text-2xl font-bold">Count: {store.getState().value}</p>
      <div className="flex flex-row gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default CounterWithLegacyRedux;
