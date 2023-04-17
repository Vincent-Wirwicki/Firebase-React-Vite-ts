import { AuthModalContextProvider } from "./context/AuthModalContext";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";
import Root from "./pages/root/Root";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import UserSettings from "./pages/user/UserSettings";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import CreatePost from "./pages/post/CreatePost";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/user/:uid" element={<User />} />
        <Route path="/user/:uid/settings" element={<UserSettings />} />

        <Route path="/createPost" element={<CreatePost />} />

        <Route path="/auth/SignIn" element={<SignIn />} />
        <Route path="/auth/SignUp" element={<SignUp />} />
        <Route path="/auth/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <AuthModalContextProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </AuthModalContextProvider>
  );
};

export default App;
