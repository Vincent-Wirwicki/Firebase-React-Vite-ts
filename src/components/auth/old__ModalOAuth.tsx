import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import "../../styles/components/auth/authModal.css";
import "../../styles/components/auth/form.css";

const ModalAuth: React.FC = () => {
  const {
    user,
    isAuthModalOpen,
    setIsAuthModalOpen,
    errorMessages,
    createUser,
    signIn,
    signInWithGoogle,
  } = UserAuth();

  const [isSignUpDisplay, setIsSignUpDisplay] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onCloseModal = (): void => {
    setIsAuthModalOpen(false);
    setIsSignUpDisplay(true);
    setPassword("");
    setEmail("");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      isSignUpDisplay
        ? await createUser(email, password)
        : await signIn(email, password);
      onCloseModal();
      setTimeout(() => console.log(user), 1000);
    } catch (error: any) {
      console.log(error);
      for (const err in errorMessages) {
        error.message.includes(err)
          ? setErrorMsg("Oups something went wrong")
          : setErrorMsg(errorMessages[err]);
      }
    }
  };

  const signWithProvider = async () => {
    try {
      await signInWithGoogle();
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const displayModal = `auth__modal ${isAuthModalOpen ? "show" : "hide"}`;

  return (
    <div className={displayModal}>
      <div className="auth__wrap__form">
        <div className="auth__wrap__btn__close">
          <button className="auth__btn__close" onClick={onCloseModal}>
            X
          </button>
        </div>
        <div className="auth__wrap__tab">
          <button
            className={
              isSignUpDisplay
                ? "auth__wrap__tab__btn__active"
                : "auth__wrap__tab__btn"
            }
            onClick={() => setIsSignUpDisplay(true)}
          >
            Sign up
          </button>
          <button
            className={
              !isSignUpDisplay
                ? "auth__wrap__tab__btn__active"
                : "auth__wrap__tab__btn"
            }
            onClick={() => setIsSignUpDisplay(false)}
          >
            Sign In
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth__form">
          <input
            type="mail"
            autoComplete="true"
            className="auth__form__input"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            autoComplete="true"
            minLength={6}
            maxLength={60}
            className="form__input"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="auth__form__btn">
            {isSignUpDisplay ? "Sign Up" : "Sign In"}
          </button>
          <div>
            {errorMsg && (
              <h3 className="auth__form__error__text">{errorMsg}</h3>
            )}
          </div>
        </form>

        <div>Or continue with</div>
        <button
          className="auth__provider__btn"
          onClick={() => {
            signWithProvider();
          }}
        >
          GOOGLE
        </button>
      </div>
    </div>
  );
};

export default ModalAuth;
