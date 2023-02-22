import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: Props) => {
  const [user, error, loading] = useAuthState(auth);
  if (!user) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoutes;
