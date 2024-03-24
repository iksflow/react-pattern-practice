import { createContext } from "react";

export interface ISampleContext {
  value: () => string;
  setValue: (value: string) => void;
}
export const SampleContext = createContext<ISampleContext>({
  value: () => "",
  setValue: () => {},
});
