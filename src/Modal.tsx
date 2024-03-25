interface ModalProps {
  handleClose: () => void;
}
const Modal = ({ handleClose }: ModalProps) => {
  return (
    <div className="absolute top-0 w-screen h-screen left-0 bg-black/50 flex flex-col items-center justify-center z-10">
      <div className="bg-white w-[500px] h-[500px] flex flex-col items-center justify-around">
        <h1>Modal Component</h1>
        <div>Modal Content</div>
        <button
          className="text-white bg-blue-500 rounded-lg p-2"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
