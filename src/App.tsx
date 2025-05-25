import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout.tsx";
import LandingPage from "./pages/LandingPage.tsx";

function App() {
  return (
    <AnimatePresence mode={"wait"}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
