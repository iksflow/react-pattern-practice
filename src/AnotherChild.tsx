import AnotherChildModal from "./AnotherChildModal";
import useModal from "./useModal";
const AnotherChild = () => {
  console.log("Render Another Child");
  const { open, close } = useModal();
  const handleOpenModal = () => {
    open({ Component: AnotherChildModal, props: { close: handleCloseModal } });
  };
  const handleCloseModal = () => {
    close({ Component: AnotherChildModal, props: {} });
  };

  return (
    <>
      <div>Another Child Component</div>
      <button onClick={handleOpenModal}>Open the Another Child Modal</button>
    </>
  );
};

export default AnotherChild;
