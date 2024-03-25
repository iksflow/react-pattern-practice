import { useRecoilState } from "recoil";
import modalState from "./modalState";
import type { Modal } from "./modalState";

const useModal = () => {
  // console.log("Render useModal");
  const [modals, setModals] = useRecoilState(modalState);
  const open = (modal: Modal) => {
    const isModalAlreadyOpened = modals.some(
      (openedModal) => openedModal.Component === modal.Component
    );
    if (isModalAlreadyOpened) {
      console.log("Already Opened!");
      return;
    }

    setModals((prev) => [...prev, modal]);
  };

  const close = (modal: Modal) => {
    setModals((prev) => {
      return prev.filter(
        (openedModal) => openedModal.Component !== modal.Component
      );
    });
  };

  return { open, close };
};
export default useModal;
