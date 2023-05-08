import { AuthModal } from "../../../context/AuthModalContext";
import { auth } from "../../../firebase/firebase";
import ForgotPassword from "./ForgotPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignWithProvider from "./SignWithProvider";
import SpanForm from "./SpanForm";
import "../../styles/components/auth/authModal.css";
import "../../styles/components/auth/form.css";

const ModalAuth: React.FC = () => {
  const { toggleModal, onCloseModal, forms } = AuthModal();
  const { signIn, signUp, forgotPassword } = forms;

  const messages = {
    haveAccount: "You already have an account ?",
    noAccount: "You don't have an account ?",
  };

  if (auth.currentUser !== null) {
    return <></>;
  }

  return (
    <div className={`auth__modal ${toggleModal ? "show" : "hide"}`}>
      <div className="auth__wrap">
        <div className="auth__wrap__btn__close">
          <button className="auth__btn__close" onClick={onCloseModal}>
            <span className="auth__btn__close__x">+</span>
          </button>
        </div>
        {signIn && <SignIn />}
        {signUp && <SignUp />}
        {forgotPassword && <ForgotPassword />}
        <div className="auth__wrap__text__toggle">
          <p className="">
            {forgotPassword && messages.noAccount}
            {signIn && messages.noAccount}
            {signUp && messages.haveAccount}
          </p>
          {forgotPassword && (
            <SpanForm content={"Register"} display={"signUp"} />
          )}
          {signIn && <SpanForm content={"Register"} display={"signUp"} />}
          {signUp && <SpanForm content={"Sign In"} display={"signIn"} />}
        </div>
        <p>Or continue with :</p>
        <SignWithProvider />
      </div>
    </div>
  );
};

export default ModalAuth;
