import { ComponentType, PropsWithChildren } from "react";

export interface Modal<P = any> {
  Component: ComponentType<P>;
  props: P;
}

export interface ModalProps {
  title: string;
  content: string | JSX.Element;
  handleClose: () => void;
}
