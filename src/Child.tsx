import { useContext } from "react";
import { SampleContext } from "./SampleContext";

const Child = () => {
  // useContext(SampleContext);
  console.log("Render Child");
  return <div>Child</div>;
};

export default Child;
