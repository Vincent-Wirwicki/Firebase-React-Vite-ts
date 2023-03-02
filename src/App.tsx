import { AuthModalContextProvider } from "./context/AuthModalContext";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import "./App.css";
import Root from "./pages/root/Root";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";

const App = () => {
  const [user, error, loading] = useAuthState(auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/user" element={<ProtectedRoutes />}>
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <AuthModalContextProvider>
        <RouterProvider router={router} />
      </AuthModalContextProvider>
    </div>
  );
};

export default App;
