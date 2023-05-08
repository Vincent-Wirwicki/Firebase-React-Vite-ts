import { AuthModalContextProvider } from "./context/AuthModalContext";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";
import Root from "./pages/root/Root";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import UserSettings from "./pages/user/UserSettings";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import PostPhoto from "./pages/photo/PostPhoto";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Photo from "./pages/photo/Photo";
import EditPhoto from "./pages/photo/EditPhoto";
import { lazy } from "react";
import AlertDialog from "./pages/user/AlertDialog";
// import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { ColorModeContextProvider } from "./context/ColorMode";

const App = () => {
  // const User = lazy(() => import("./pages/user/User"));
  // const location = useLocation();
  // const background = location.state && location.state.background;
  // console.log(background);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/user/:uid" element={<User />} />
        <Route path="/user-settings/:uid" element={<UserSettings />}>
          <Route
            path="/user-settings/:uid/AlertDialog"
            element={<AlertDialog />}
          />
        </Route>
        <Route path="/PostPhoto" element={<PostPhoto />} />
        <Route path="/photo/:uid" element={<Photo />} />
        <Route path="/photo/:uid/edit" element={<EditPhoto />} />
        <Route path="/auth/SignIn" element={<SignIn />} />
        <Route path="/auth/SignUp" element={<SignUp />} />
        <Route path="/auth/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <>
      <ColorModeContextProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </ColorModeContextProvider>
    </>
  );
};

export default App;
