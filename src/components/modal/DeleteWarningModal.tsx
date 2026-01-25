import Modal from "./Modal.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";

type DeleteWarningModalProps = {
  onSubmit: () => void;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  loading?: boolean;
};

const DeleteWarningModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  loading,
}: DeleteWarningModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={
          "max-h-[80vh] flex border-2 border-red-100 flex-col w-full p-4 gap-4 shadow-xl rounded-lg bg-black-200"
        }
      >
        <h2 className={"text-2xl text-red-100 text-center"}>{title}</h2>

        <div className={"w-full flex gap-4"}>
          <AnimatedButton
            borderColor={"#2c2c2c"}
            className={"w-full h-[50px] rounded-lg"}
            onClick={onClose}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            onClick={onSubmit}
            borderColor={"#2c2c2c"}
            loading={loading}
            className={"w-full h-[50px] rounded-lg"}
          >
            Delete Post
          </AnimatedButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWarningModal;
