import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes/Route";
import { Toaster } from "./components/ui/sonner";
import "./i18n/config";
import { EditableProvider } from "./context/EditableContext";
import AdminToolbar from "./components/admin/AdminToolbar";

const router = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
    <EditableProvider>
      <RouterProvider router={router} />
      <AdminToolbar />
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          },
          className: "sonner-toast",
          duration: 4000,
        }}
      />
    </EditableProvider>
    </>
  );
}

export default App;
