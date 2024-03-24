import { create } from "zustand";

interface CounterState {
  count: number;
  increase: (by: number) => void;
}

const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increase: (by) => set((state) => ({ count: state.count + by })),
}));

export default useCounterStore;
