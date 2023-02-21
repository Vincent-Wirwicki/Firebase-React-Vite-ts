import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignWithProvider from "./SignWithProvider";
import { AuthModal } from "../../context/AuthModalContext";
import "../../styles/components/auth/authModal.css";
import "../../styles/components/auth/form.css";

const ModalAuth: React.FC = () => {
  const { toggleModal, onCloseModal, toggleSignUp, setToggleSignUp } =
    AuthModal();

  const displayModal = `auth__modal ${toggleModal ? "show" : "hide"}`;

  return (
    <div className={displayModal}>
      <div className="auth__wrap">
        <div className="auth__wrap__btn__close">
          <button className="auth__btn__close" onClick={onCloseModal}>
            <span className="auth__btn__close__x">X</span>
          </button>
        </div>
        {toggleSignUp ? <SignUp /> : <SignIn />}
        <div className="auth__wrap__text__toggle">
          <p className="">
            {toggleSignUp
              ? "You already have an account ?"
              : "You don't have an account ?"}
          </p>
          <p
            onClick={() => setToggleSignUp(!toggleSignUp)}
            className="auth__text__toggle__strong"
          >
            {toggleSignUp ? "Login" : "Register"}
          </p>
        </div>
        <p>Or continue with :</p>
        <SignWithProvider />
      </div>
    </div>
  );
};

export default ModalAuth;
