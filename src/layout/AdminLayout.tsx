import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar.tsx";

const AdminLayout = () => {
  return (
    <div className="min-h-screen  flex flex-col md:flex-row bg-black-100">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
