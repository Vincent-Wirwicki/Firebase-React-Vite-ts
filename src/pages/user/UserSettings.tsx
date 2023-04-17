import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import Grid from "@mui/material/Grid";

const UserSettings = () => {
  if (!auth.currentUser) {
    return <Navigate to="/" />;
  }
  return <div>UserSettings</div>;
};

export default UserSettings;
