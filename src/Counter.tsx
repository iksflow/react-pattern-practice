import { useRecoilState } from "recoil";
import counterState from "./counterState";

const Counter = () => {
  const [count, setCount] = useRecoilState(counterState);
  const handleCount = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <div>Count is {count}</div>
      <button onClick={handleCount}>Count up</button>
    </>
  );
};

export default Counter;
