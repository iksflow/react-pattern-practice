import useModalsStore from "./useModal";

const Modals = () => {
  console.log("Render Modals");
  const modals = useModalsStore((state) => state.modals);
  return (
    <>
      {modals.map((modal, index) => (
        <modal.Component key={index} {...modal.props} />
      ))}
    </>
  );
};

export default Modals;
