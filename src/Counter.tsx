import Child from "./Child";
import useCounterStore from "./useStore";

const Counter = () => {
  console.log("Render Counter");
  const count = useCounterStore((state) => state.count);
  const increaseCount = useCounterStore((state) => state.increase);
  const handleCount = () => {
    increaseCount(1);
  };
  return (
    <>
      <div>Count is {count}</div>
      <button onClick={handleCount}>Count up</button>
      <Child />
    </>
  );
};

export default Counter;
