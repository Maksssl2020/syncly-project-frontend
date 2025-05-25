import Header from "../components/header/Header.tsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.tsx";

const AppLayout = () => {
  return (
    <div className={"min-h-[100vh] flex flex-col"}>
      <Header />
      <div className={"w-full h-auto px-6 py-12"}>
        <Outlet />
      </div>
      <div className={"mt-auto bottom-0"}>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
