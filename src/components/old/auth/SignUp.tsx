import { auth, db } from "../../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { AuthModal } from "../../../context/AuthModalContext";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import InputForm from "./InputForm";
import "../../styles/components/auth/form.css";

const SignUp: React.FC = () => {
  const { onCloseModal, onChange, formData } = AuthModal();
  const { userName, email, password } = formData;
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const addUserToFirestoreDB = async (): Promise<void> => {
    if (auth.currentUser !== null) {
      updateProfile(auth.currentUser, { displayName: userName });
      const docRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(docRef, {
        uid: auth.currentUser.uid,
        email,
        userName,
        city: "unknown",
        country: "unknown",
        social: "unknown",
        bio: "unknown",
        photoURL: auth.currentUser.photoURL,
        createdAt: serverTimestamp(),
      });
      onCloseModal();
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
      addUserToFirestoreDB();
    } catch (error) {}
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3>Create an account</h3>
      <input
        autoComplete="true"
        placeholder="user name"
        className="form__input"
        value={userName}
        id="userName"
        onChange={e => onChange(e)}
        type="text"
        required
      />
      <InputForm type={"email"} value={email} />
      <InputForm type={"password"} value={password} />
      <button type="submit">{!loading ? "Sign Up" : "loading"}</button>
      <div className="form__error">{error && <span>{error.message}</span>}</div>
    </form>
  );
};

export default SignUp;
