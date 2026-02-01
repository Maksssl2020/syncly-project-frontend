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
import AdminCategories from "./pages/AdminCategories.tsx";
import AdminTagCategoryForm from "./pages/AdminTagCategoryForm.tsx";
import AdminAllActivity from "./pages/AdminAllActivity.tsx";
import NotFound from "./pages/NotFound.tsx";
import Conversations from "./pages/Conversations.tsx";
import { Conversation } from "./pages/Conversation.tsx";
import Friends from "./pages/Friends.tsx";
import ProtectedSignedInRoute from "./routes/ProtectedSignedInRoute.tsx";
import useAuthentication from "./hooks/useAuthentication.ts";
import { useEffect } from "react";
import { connectStomp } from "./config/stompClient.ts";
import TwoFactorVerificationCode from "./pages/TwoFactorVerificationCode.tsx";

function App() {
  const { accessToken, username } = useAuthentication();

  useEffect(() => {
    if (accessToken && username) {
      connectStomp(accessToken, username);
    }
  }, [accessToken, username]);

  return (
    <AnimatePresence mode={"wait"}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route element={<ProtectedSignedInRoute />}>
            <Route element={<DashboardLayout />}>
              <Route
                path="/my-blog"
                element={<UserBlog isSignedInUserBlog={true} />}
              />
              <Route path="/blog/:id" element={<UserBlog />} />
              <Route path="/saved-posts" element={<SavedPosts />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/tags/:tag" element={<Tag />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/conversations" element={<Conversations />} />
              <Route path="/friends" element={<Friends />} />
              <Route
                path="/conversation/:receiverId/:receiverUsername"
                element={<Conversation />}
              />
              <Route path="/search" element={<Search />} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path={"/admin/panel"} element={<AdminPanel />} />
              <Route path={"/admin/panel/users"} element={<AdminUsers />} />
              <Route
                path={"/admin/panel/all-activity"}
                element={<AdminAllActivity />}
              />
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
              <Route
                path={"/admin/panel/categories"}
                element={<AdminCategories />}
              />
              <Route
                path={"/admin/panel/categories/create"}
                element={<AdminTagCategoryForm />}
              />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-2fa" element={<TwoFactorVerificationCode />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
