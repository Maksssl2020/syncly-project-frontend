import { useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication.ts";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedSignedInRoute = () => {
  const navigate = useNavigate();
  const { authenticated } = useAuthentication();

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  return <Outlet />;
};

export default ProtectedSignedInRoute;
