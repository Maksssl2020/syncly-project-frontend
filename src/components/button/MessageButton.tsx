import AnimatedButton from "./AnimatedButton.tsx";
import { MessageCircle } from "lucide-react";

type MessageButtonProps = {
  onClick: () => void;
  className?: string;
};

const MessageButton = ({
  onClick,
  className = "flex-1 px-4 py-2 rounded-lg",
}: MessageButtonProps) => {
  return (
    <AnimatedButton
      bgColor={"#14b8a6"}
      bgColorHover={"#0d9488"}
      borderColor={"#14b8a6"}
      borderColorHover={"#0d9488"}
      textColor={"#111111"}
      textColorHover={"#111111"}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <MessageCircle className={"size-4"} />
      Message
    </AnimatedButton>
  );
};
export default MessageButton;
