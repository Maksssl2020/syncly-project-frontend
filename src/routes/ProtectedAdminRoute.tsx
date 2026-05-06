import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication.ts";

const ProtectedAdminRoute = () => {
  const navigate = useNavigate();
  const { role } = useAuthentication();

  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/");
    }
  }, [role, navigate]);

  return <Outlet />;
};
export default ProtectedAdminRoute;
