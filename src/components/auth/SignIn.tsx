// import { signInWithEmailAndPassword } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/firebase";
import InputForm from "./InputForm";
import "../../styles/components/auth/form.css";

const SignIn: React.FC = () => {
  const { onCloseModal, formData, activeForm } = AuthModal();
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
      <InputForm type={"email"} value={email} />
      <InputForm type={"password"} value={password} />
      <span
        className="auth__text__toggle__strong"
        data-display-form="forgotPassword"
        onClick={e => activeForm(e)}
      >
        Forgot Password ?
      </span>
      <button type="submit">{!loading ? "Sign Up" : "loading"}</button>
      <div className="form__error">{error && <span>{error.message}</span>}</div>
    </form>
  );
};

export default SignIn;
