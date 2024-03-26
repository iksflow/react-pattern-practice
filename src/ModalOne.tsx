import { ModalProps } from "./type";

const ModalOne = ({ title, content, handleClose }: ModalProps) => {
  console.log("Render ModalOne");
  return (
    <>
      <div>
        <h1>Modal One Title: {title}</h1>
        <span>Content: {content}</span>
        <button onClick={handleClose}>Close</button>
      </div>
    </>
  );
};

export default ModalOne;
