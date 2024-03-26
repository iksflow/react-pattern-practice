import { create } from "zustand";
import { Modal } from "./type";

interface ModalsState {
  modals: Modal[];
  open: (modal: Modal) => void;
  close: (Component: Modal["Component"]) => void;
}

const useModalsStore = create<ModalsState>()((set) => ({
  modals: [],
  open: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  close: (Component) =>
    set((state) => {
      const filteredModals = state.modals.filter(
        (modal) => modal.Component !== Component
      );
      return { modals: filteredModals };
    }),
}));

export default useModalsStore;
