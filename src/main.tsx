import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />

    <Toaster
      toastOptions={{
        position: "top-right",
        style: {
          backgroundColor: "#111111",
          color: "#e6e6e6",
          border: "2px solid #2c2c2e",
        },
      }}
    />
  </QueryClientProvider>,
);
