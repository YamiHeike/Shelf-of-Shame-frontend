import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home, LoginPage, SignupPage } from "../pages";

export type appRoute = {
  path: string;
  label: string;
};

type appRoutes = {
  [key: string]: appRoute;
};

export const routes: appRoutes = {
  HOME: {
    path: "/",
    label: "Home",
  },
  LOGIN: {
    path: "/login",
    label: "Login",
  },
  SIGNUP: {
    path: "/signup",
    label: "Sign Up",
  },
};

export const router = createBrowserRouter([
  {
    path: routes.HOME.path,
    element: <Layout />,
    children: [
      {
        path: routes.HOME.path,
        element: <Home />,
      },
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
