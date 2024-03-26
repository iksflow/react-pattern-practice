import { ModalProps } from "./type";

const ModalTwo = ({ title, content, handleClose }: ModalProps) => {
  console.log("Render ModalTwo");
  return (
    <>
      <div>
        <h1>Modal Two Title: {title}</h1>
        <span>Content: {content}</span>
        <button onClick={handleClose}>Close</button>
      </div>
    </>
  );
};

export default ModalTwo;
