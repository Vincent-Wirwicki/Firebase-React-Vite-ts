import { auth, db } from "../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { AuthModal } from "../../context/AuthModalContext";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import "../../styles/components/auth/form.css";

const SignUp: React.FC = () => {
  const { onCloseModal, onChange, formData, setToggleModal } = AuthModal();
  const { userName, email, password } = formData;
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const addUserToFirestoreDB = async (): Promise<void> => {
    if (auth.currentUser !== null) {
      updateProfile(auth.currentUser, { displayName: userName });
      const docRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(docRef, {
        email: email,
        userName: userName,
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
      <input
        autoComplete="true"
        placeholder="email"
        className="form__input"
        value={email}
        id="email"
        onChange={e => onChange(e)}
        type="text"
        required
      />
      <input
        autoComplete="true"
        placeholder="password"
        className="form__input"
        value={password}
        id="password"
        onChange={e => onChange(e)}
        type="password"
        required
      />
      <button type="submit">{!loading ? "Sign Up" : "loading"}</button>
      <div className="form__error">{error && <span>{error.message}</span>}</div>
    </form>
  );
};

export default SignUp;
