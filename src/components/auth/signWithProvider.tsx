import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthModal } from "../../context/AuthModalContext";
import { auth, db } from "../../firebase/firebase";

const SignWithProvider: React.FC = () => {
  const { onCloseModal } = AuthModal();

  const addUserToFirestoreDB = async (): Promise<void> => {
    if (auth.currentUser !== null) {
      const {
        currentUser: { uid, email, displayName: userName, photoURL },
      } = auth;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email,
          userName,
          photoURL,
          city: "none",
          country: "none",
          social: "none",
          bio: "none",
          createdAt: serverTimestamp(),
        });
      }
      onCloseModal();
    }
  };

  const onSubmit = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      addUserToFirestoreDB();
    } catch (error) {}
  };

  return <button onClick={onSubmit}>Google</button>;
};

export default SignWithProvider;
