import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { router } from "./routes";
import { AuthProvider } from "./components/Auth/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
