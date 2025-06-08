import AnimatedButton from "./AnimatedButton.tsx";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AnimatedGoBackButtonProps = {
  title: string;
  link: string | "-1";
};

const AnimatedGoBackButton = ({ title, link }: AnimatedGoBackButtonProps) => {
  const navigate = useNavigate();

  return (
    <AnimatedButton
      onClick={() => {
        if (link === "-1") {
          navigate(-1);
        } else {
          navigate(link);
        }
      }}
      textColor={"#b0b0b0"}
      textColorHover={"#14b8a6"}
      bgColor={"#222222"}
      bgColorHover={"#222222"}
      borderColor={"#222222"}
      borderColorHover={"#222222"}
      className={"flex items-center gap-3 py-2 px-4"}
    >
      <ArrowLeft className={"size-5 "} />
      <span>{title}</span>
    </AnimatedButton>
  );
};

export default AnimatedGoBackButton;
