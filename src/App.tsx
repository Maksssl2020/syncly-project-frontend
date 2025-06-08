import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DashboardLayout from "./layout/DashboardLayout.tsx";
import UserBlog from "./pages/UserBlog.tsx";
import SavedPosts from "./pages/SavedPosts.tsx";
import Tags from "./pages/Tags.tsx";
import { Tag } from "./pages/Tag.tsx";
import Settings from "./pages/Settings.tsx";
import Search from "./pages/Search.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import AdminUsers from "./pages/AdminUsers.tsx";
import AdminReports from "./pages/AdminReports.tsx";
import AdminTags from "./pages/AdminTags.tsx";
import AdminTagForm from "./pages/AdminTagForm.tsx";
import AdminUserForm from "./pages/AdminUserForm.tsx";

function App() {
  return (
    <AnimatePresence mode={"wait"}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/blog" element={<UserBlog />} />
            <Route path="/saved-posts" element={<SavedPosts />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/tags/:tag" element={<Tag />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/search" element={<Search />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path={"/admin/panel"} element={<AdminPanel />} />
            <Route path={"/admin/panel/users"} element={<AdminUsers />} />
            <Route
              path={"/admin/panel/users/edit/:id"}
              element={<AdminUserForm />}
            />
            <Route path={"/admin/panel/reports"} element={<AdminReports />} />
            <Route path={"/admin/panel/tags"} element={<AdminTags />} />
            <Route
              path={"/admin/panel/tags/create"}
              element={<AdminTagForm />}
            />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
