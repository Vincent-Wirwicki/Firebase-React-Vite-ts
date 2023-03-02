import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/firebase";
import InputForm from "./InputForm";
import SpanForm from "./SpanForm";
import "../../styles/components/auth/form.css";
import { useState } from "react";

const SignIn: React.FC = () => {
  const { onCloseModal, formData } = AuthModal();
  const { email, password } = formData;
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (email.length >= 3 && password.length >= 3) {
      try {
        await signInWithEmailAndPassword(email, password);
        if (auth.currentUser !== null) {
          onCloseModal();
        }
      } catch (error: any) {
        setErrorMsg(error.message);
      }
    } else {
      setErrorMsg("Some fields are not complete");
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h3>Log In</h3>
      <InputForm type={"email"} value={email} />
      <InputForm type={"password"} value={password} />
      <SpanForm content={"Forgot password ?"} display={"forgotPassword"} />
      <button type="submit">{!loading ? "Sign Up" : "loading"}</button>
      <div className="form__error">{error && <span>{error.message}</span>}</div>
    </form>
  );
};

export default SignIn;
