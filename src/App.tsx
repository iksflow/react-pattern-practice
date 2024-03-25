import { useState } from "react";
import Child from "./Child";
import Modal from "./Modal";

function App() {
  console.log("Render App");
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-slate-300 h-screen">
        <h1 className="text-4xl">Hello World</h1>
        <button
          className="bg-blue-500 rounded-lg p-2"
          onClick={handleOpenModal}
        >
          Open the Modal
        </button>
      </div>
      {isOpen && <Modal handleClose={handleCloseModal} />}
    </>
  );
}

export default App;
