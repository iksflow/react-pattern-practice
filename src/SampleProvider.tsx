import { PropsWithChildren, useState } from "react";
import { SampleContext } from "./SampleContext";
import Sample from "./Sample";

const SampleProvider = ({ children }: PropsWithChildren) => {
  const [sampleText, setSampleText] = useState("Hello");
  const value = () => {
    return sampleText;
  };

  const setValue = (value: string) => {
    setSampleText(value);
  };

  const dispatch = { value, setValue };
  return (
    <SampleContext.Provider value={dispatch}>
      {children}
      <Sample />
    </SampleContext.Provider>
  );
};

export default SampleProvider;
