/* eslint-disable @typescript-eslint/no-namespace */
import { ComponentType } from "react";
import { atom } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Modal<P = any> {
  Component: ComponentType<P>;
  props: P;
}

const modalState = atom<Modal[]>({
  key: "modalState",
  default: [],
});

export default modalState;
