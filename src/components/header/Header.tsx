import { useNavigate } from "react-router-dom";
import AnimatedButton from "../button/AnimatedButton.tsx";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className={"w-full h-[85px] px-4 bg-black-300 flex items-center relative"}
    >
      <nav className={"w-full justify-between items-center flex"}>
        <div className={"flex items-center gap-2 "}>
          <div
            className={
              "size-12 bg-teal-100 rounded-lg flex items-center justify-center"
            }
          >
            <span className={"text-white-100 font-bold text-lg"}>S</span>
          </div>
          <div className={"text-2xl font-bold text-white-100"}>Syncly</div>
        </div>
        <div className={"flex items-center gap-4"}>
          <AnimatedButton
            borderColor={"#171719"}
            onClick={() => navigate("/sign-in")}
            className={"px-4 py-3 rounded-lg"}
            bgColor={"#171719"}
          >
            Sign In
          </AnimatedButton>
          <AnimatedButton
            borderColor={"#171719"}
            bgColor={"#171719"}
            onClick={() => navigate("/sign-up")}
            className={"px-4 py-3 rounded-lg"}
          >
            Sign Up
          </AnimatedButton>
        </div>
      </nav>
    </header>
  );
};

export default Header;
