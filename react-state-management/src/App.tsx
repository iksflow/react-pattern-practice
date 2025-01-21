import '@/App.css';
import CounterWithUseState from '@/components/Counter/CounterWithUseState';

function App() {
  return (
    <>
      <div className="w-full bg-black">
        <div className="mx-auto w-[800px] h-screen bg-gray-700">
          <CounterWithUseState />
        </div>
      </div>
    </>
  );
}

export default App;
