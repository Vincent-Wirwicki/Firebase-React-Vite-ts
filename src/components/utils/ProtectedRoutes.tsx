import { Navigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: Props) => {
  const { user } = UserAuth();
  if (!user) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoutes;
