import { useRecoilValue } from "recoil";
import modalState from "./modalState";

const Modals = () => {
  console.log("Render Modals");

  const modals = useRecoilValue(modalState);

  return (
    <>
      {modals.map((modal, index) => {
        return <modal.Component key={index} {...modal.props}></modal.Component>;
      })}
    </>
  );
};

export default Modals;
