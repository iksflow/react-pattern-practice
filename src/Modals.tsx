import { useRecoilState } from "recoil";
import modalState from "./modalState";

const Modals = () => {
  console.log("Render Modals");
  const [modals] = useRecoilState(modalState);
  return (
    <>
      {modals.map((modal, index) => {
        return <modal.Component key={index} {...modal.props}></modal.Component>;
      })}
    </>
  );
};

export default Modals;
