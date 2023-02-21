import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthModal } from "../../context/AuthModalContext";
import { auth, db } from "../../firebase/firebase";

const SignWithProvider: React.FC = () => {
  const { onCloseModal } = AuthModal();

  const addUserToFirestoreDB = async (): Promise<void> => {
    if (auth.currentUser !== null) {
      const {
        currentUser: { uid, email, displayName, photoURL },
      } = auth;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email: email,
          userName: displayName,
          photoURL: photoURL,
          createdAt: serverTimestamp(),
        });
      }
    }
  };
  const onSubmit = async (): Promise<void> => {
    try {
      console.log("provider");
      await signInWithPopup(auth, new GoogleAuthProvider());
      addUserToFirestoreDB();
      onCloseModal();
    } catch (error) {}
  };

  return <button onClick={onSubmit}>Google</button>;
};

export default SignWithProvider;
