import TodoContainer from './containers/todo/container';
import TodoWithCustomHook from './components/Todo/TodoWithCustomHook';
import TodoWithReactQuery from './components/Todo/TodoWithReactQuery';

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen mx-auto">
        {/* <TodoWithReactQuery /> */}

        <TodoContainer />
      </div>
    </>
  );
}

export default App;
