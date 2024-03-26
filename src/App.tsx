import Child from "./Child";
import ModalOne from "./ModalOne";
import ModalTwo from "./ModalTwo";

import useModalsStore from "./useModal";

function App() {
  console.log("Render App");
  const openModal = useModalsStore((state) => state.open);
  const closeModal = useModalsStore((state) => state.close);
  const handleOpenModalOne = () => {
    openModal({
      Component: ModalOne,
      props: {
        title: "",
        content: "",
        handleClose: () => {
          closeModal(ModalOne);
        },
      },
    });
  };
  const handleOpenModalTwo = () => {
    openModal({
      Component: ModalTwo,
      props: {
        title: "",
        content: "",
        handleClose: () => {
          closeModal(ModalTwo);
        },
      },
    });
  };
  return (
    <>
      <div>Hello World</div>
      <Child />
      <button onClick={handleOpenModalOne}>Open ModalOne</button>
      <button onClick={handleOpenModalTwo}>Open ModalTwo</button>
    </>
  );
}

export default App;
