import ChildModal from "./ChildModal";
import useModal from "./useModal";

const Child = () => {
  console.log("Render Child");
  const { open, close } = useModal();
  const handleOpenModal = () => {
    open({ Component: ChildModal, props: { close: handleCloseModal } });
  };
  const handleCloseModal = () => {
    close({ Component: ChildModal, props: {} });
  };

  return (
    <>
      <div>Child Component</div>
      <button onClick={handleOpenModal}>Open the Child Modal</button>
    </>
  );
};

export default Child;
