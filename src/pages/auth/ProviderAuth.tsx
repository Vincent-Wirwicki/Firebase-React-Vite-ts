import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthModal } from "../../context/AuthModalContext";
import { auth, db } from "../../firebase/firebase";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const ProviderAuth = () => {
  const navigate = useNavigate();

  const addUserToFirestoreDB = async (): Promise<void> => {
    if (auth.currentUser) {
      const {
        currentUser: { uid, email, displayName: userName, photoURL },
      } = auth;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: auth.currentUser.uid,
          email,
          userName,
          photoURL,
          city: "",
          country: "",
          social: "",
          bio: "",
          createdAt: serverTimestamp(),
        });
      }
    }
  };

  const onSubmit = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      addUserToFirestoreDB();
      navigate("/");
    } catch (error) {}
  };
  return (
    <>
      <Divider>Or</Divider>
      <Button variant="outlined" startIcon={<GoogleIcon />} onClick={onSubmit}>
        Sign with Google
      </Button>
    </>
  );
};

export default ProviderAuth;
