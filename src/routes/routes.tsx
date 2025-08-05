import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import {
  Home,
  LoginPage,
  SignupPage,
  ShelfPage,
  AddBookPage,
  StatsPage,
  RecommendationsPage,
} from "../pages";
import { ShelfItemPage } from "../pages/ShelfItemPage";

export type AppRoute = {
  path: string;
  label?: string;
};

type AppRoutes = {
  [key: string]: AppRoute;
};

export const routes: AppRoutes = {
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
  SHELF: {
    path: "/shelf",
    label: "Your Shelf",
  },
  SHELF_ITEM_DETAILS: {
    path: "/shelf/:isbn",
  },
  ADD: {
    path: "/new",
  },
  STATS: {
    path: "/stats",
  },
  RECOMMENDATIONS: {
    path: "/recommendations",
    label: "Recommendations",
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
      {
        path: routes.SHELF.path,
        element: <ShelfPage />,
      },
      {
        path: routes.SHELF_ITEM_DETAILS.path,
        element: <ShelfItemPage />,
      },
      {
        path: routes.ADD.path,
        element: <AddBookPage />,
      },
      {
        path: routes.STATS.path,
        element: <StatsPage />,
      },
      {
        path: routes.RECOMMENDATIONS.path,
        element: <RecommendationsPage />,
      },
    ],
  },
]);
