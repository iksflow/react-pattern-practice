import { useSetRecoilState } from "recoil";
import modalState from "./modalState";
import type { Modal } from "./modalState";

const useModal = () => {
  const setModals = useSetRecoilState(modalState);
  const open = (modal: Modal) => {
    setModals((prev) => {
      const isModalAlreadyOpened = prev.some(
        (openedModal) => openedModal.Component === modal.Component
      );
      if (isModalAlreadyOpened) {
        console.log("Already Opened!");
        return prev;
      }
      return [...prev, modal];
    });
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
