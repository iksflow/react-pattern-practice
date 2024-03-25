import { useState } from "react";
import ChildModal from "./ChildModal";

const Child = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div>Child Component</div>
      <button onClick={handleOpenModal}>Open Child Modal</button>
      {isOpen && <ChildModal handleClose={handleCloseModal} />}
    </div>
  );
};

export default Child;
