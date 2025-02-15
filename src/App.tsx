import { RouterProvider } from "react-router-dom";
import { App as AntdApp } from "antd";
import { router } from "./routes";
import { AuthProvider } from "./components/Auth/AuthContext";

function App() {
  return (
    <AntdApp>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AntdApp>
  );
}

export default App;
