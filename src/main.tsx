import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import User from "./pages/user/User";
import ErrorPage from "./pages/error/ErrorPage";
// import AuthPage from "./pages/auth/AuthPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/user",
//     element: <User />,
//   },

// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);
