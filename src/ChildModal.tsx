interface ChildModalProps {
  content: string;
  close: () => void;
}
const ChildModal = ({ content, close }: ChildModalProps) => {
  console.log("Render ChildModal");
  return (
    <>
      <div className="w-40 h-40 bg-blue-300" onClick={close}>
        <div>Child Modal</div>
        <div>Child Modal Container. Content: {content}</div>
      </div>
    </>
  );
};

export default ChildModal;
