import { useNavigate } from "react-router-dom";
import AnimatedButton from "../button/AnimatedButton.tsx";

const footerNavData = [
  {
    title: "About Us",
    value: "about-us",
  },
  {
    title: "Privacy",
    value: "privacy",
  },
  {
    title: "Terms",
    value: "terms",
  },
  {
    title: "Contact",
    value: "contact",
  },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={"w-full py-12 px-4 bg-black-300 h-auto"}>
      <div className="flex flex-col gap-12">
        <div className={"w-full flex items-center justify-between "}>
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="size-9 rounded-lg flex items-center justify-center bg-teal-100">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-white-100">Syncly</span>
          </div>
          <div
            className="flex space-x-6"
            style={{ color: "var(--color-gray-300)" }}
          >
            {footerNavData.map((item, index) => (
              <AnimatedButton
                textColorHover={"#e6e6e6"}
                bgColor={"#171719"}
                bgColorHover={"#171719"}
                textColor={"#9f9da2"}
                className={"text-gray-300"}
                key={index}
                onClick={() => navigate(item.value)}
              >
                {item.title}
              </AnimatedButton>
            ))}
          </div>
        </div>
        <div
          className={
            "border-t-2 pt-16 text-center border-gray-600 text-gray-400"
          }
        >
          <p>&copy; 2024 Syncly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
