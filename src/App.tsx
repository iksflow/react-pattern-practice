import AnotherChild from "./AnotherChild";
import Child from "./Child";
import Counter from "./Counter";

function App() {
  console.log("Render App");
  return (
    <>
      <div>Hello World</div>
      <Counter />
      <Child />
      <AnotherChild />
    </>
  );
}

export default App;
