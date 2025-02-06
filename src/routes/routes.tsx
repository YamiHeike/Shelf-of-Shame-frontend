import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { LoginPage, SignupPage } from "../pages";

export const routes = {
  HOME: {
    path: "/",
  },
  LOGIN: {
    path: "/login",
  },
  SIGNUP: {
    path: "/signup",
  },
};

export const router = createBrowserRouter([
  {
    path: routes.HOME.path,
    element: <Layout />,
    children: [
      {
        path: routes.LOGIN.path,
        element: <LoginPage />,
      },
      {
        path: routes.SIGNUP.path,
        element: <SignupPage />,
      },
    ],
  },
]);
