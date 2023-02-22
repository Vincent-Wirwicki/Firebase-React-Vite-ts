// import { signInWithEmailAndPassword } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";

const SignIn: React.FC = () => {
  const { onCloseModal, onChange, formData } = AuthModal();
  const { email, password } = formData;

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      if (auth.currentUser !== null) {
        onCloseModal();
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h3>Log In</h3>
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

export default SignIn;
