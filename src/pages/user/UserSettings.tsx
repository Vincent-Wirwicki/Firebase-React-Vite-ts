import { Navigate, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  UploadTaskSnapshot,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { UserRefType } from "../../types/Types";
import { useAuthState } from "react-firebase-hooks/auth";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { useForm } from "react-hook-form";
import EditInputForm from "../../components/user/EditInputForm";
import AlertDialog from "./AlertDialog";

interface SettingsFormType {
  bio?: string;
  city?: string;
  country?: string;
  socials?: string;
  photoUrl?: string;
  userName?: string;
}

const UserSettings = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [inputData, setInputData] = useState({});
  const [userRef, setUserRef] = useState<DocumentData>();
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchUserRef = async () => {
      try {
        if (uid && user && user.uid === uid) {
          const ref = doc(db, "users", uid);
          const docSnap = await getDoc(ref);
          if (docSnap.exists()) {
            setUserRef(docSnap.data() as UserRefType);
          } else {
            navigate("/");
          }
        }
      } catch (error) {}
    };
    fetchUserRef();
  }, []);

  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      bio: "",
      city: "",
      country: "",
      socials: "",
      photoUrl: "",
      userName: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SettingsFormType) => {
    console.log(data);
  };

  if (!user || user.uid !== uid) {
    return <Navigate to="/" />;
  }

  return (
    <Grid item xs={4} sm={8} md={12}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h4">
          <SettingsIcon /> Settings
        </Typography>
        <EditInputForm label="user name" value="userName" />
        <AlertDialog />
      </Box>
    </Grid>
  );
};

export default UserSettings;
