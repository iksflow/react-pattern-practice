import { useContext } from "react";
import { SampleContext } from "./SampleContext";

const Sample = () => {
  const context = useContext(SampleContext);
  console.log("Render Sample");
  const handleClick = () => {
    context.setValue("Bye");
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <span className="font-bold">Sample Context Value: {context.value()}</span>
      <button
        className="bg-blue-400 w-[200px] rounded-full border-[2px] border-black"
        onClick={handleClick}
      >
        Change Context Value `Hello` to `Bye`
      </button>
    </div>
  );
};

export default Sample;
