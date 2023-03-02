import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const ProtectedRoutes: React.FC = () => {
  const [user] = useAuthState(auth);
  if (!user) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoutes;
