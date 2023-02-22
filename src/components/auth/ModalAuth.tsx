import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/firebase";
import ForgotPassword from "./ForgotPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignWithProvider from "./SignWithProvider";
import SpanForm from "./SpanForm";
import "../../styles/components/auth/authModal.css";
import "../../styles/components/auth/form.css";

const ModalAuth: React.FC = () => {
  const { toggleModal, onCloseModal, forms, activeForm } = AuthModal();

  const { signIn, signUp, forgotPassword } = forms;

  if (auth.currentUser !== null) {
    return <></>;
  }

  return (
    <div className={`auth__modal ${toggleModal ? "show" : "hide"}`}>
      <div className="auth__wrap">
        <div className="auth__wrap__btn__close">
          <button className="auth__btn__close" onClick={onCloseModal}>
            <span className="auth__btn__close__x">X</span>
          </button>
        </div>
        {signIn && <SignIn />}
        {signUp && <SignUp />}
        {forgotPassword && <ForgotPassword />}
        <div className="auth__wrap__text__toggle">
          <p className="">
            {forgotPassword && "You don't have an account ?"}
            {signIn && " You don't have an account ?"}
            {signUp && "You already have an account ?"}
          </p>
          {signIn && <SpanForm content={"Register"} display={"signUp"} />}
          {signUp && <SpanForm content={"Sign In"} display={"signIn"} />}
          {forgotPassword && (
            <SpanForm content={"Register"} display={"signUp"} />
          )}
        </div>
        <p>Or continue with :</p>
        <SignWithProvider />
      </div>
    </div>
  );
};

export default ModalAuth;
