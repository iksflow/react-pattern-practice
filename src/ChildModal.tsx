interface ChildModalProps {
  handleClose: () => void;
}
const ChildModal = ({ handleClose }: ChildModalProps) => {
  return (
    <>
      <div>
        <h1>Child Modal</h1>
        <button onClick={handleClose}>Close Modal</button>
      </div>
    </>
  );
};

export default ChildModal;
