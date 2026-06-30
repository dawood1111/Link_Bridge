import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignUp from "./Pages/SignUp.jsx";
import SignIn from "./Pages/SignIn.jsx";
import MainPage from "./Pages/MainPage.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { Link, Route, Router } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import { CompanySetup } from "./Pages/ComapnySetup.jsx";
import { HomePages } from "./Pages/HomePages.jsx";
import Projects from "./Pages/ProjectSection.jsx";
import "semantic-ui-css/semantic.min.css";
import { QuotationPage } from "../src/Component/HomePage/QuotationForm.jsx";
import { TestPage } from "./Pages/TestPage.jsx";
import NotificationSection from "./Component/HomePage/NotificationsSection.jsx";
import { GoogleRegisterPage } from "./Pages/GoogleRegister.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/MainPage",
    element: <MainPage />,
    children: [
      {
        path: "Projects",
        element: <Projects />,
      },
      {
        path: "HomePage",
        element: <HomePages />,
      },
      {
        path: "Notifications",
        element: <NotificationSection />,
      },
    ],
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/CompanySetup",
    element: <CompanySetup />,
  },
  {
    path: "/QuotationPage",
    element: <QuotationPage />,
  },
  {
    path: "/TestPage",
    element: <TestPage />,
  },
  {
    path: "/GoogleRegister",
    element: <GoogleRegisterPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
