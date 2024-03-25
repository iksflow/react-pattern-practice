interface AnotherChildModalProps {
  content: string;
  close: () => void;
}
const AnotherChildModal = ({ content, close }: AnotherChildModalProps) => {
  console.log("Render AnotherChildModal");
  return (
    <>
      <div className="w-40 h-40 bg-green-300" onClick={close}>
        <div>Another Child Modal</div>
        <div>Another Child Modal Container. Content: {content}</div>
      </div>
    </>
  );
};

export default AnotherChildModal;
