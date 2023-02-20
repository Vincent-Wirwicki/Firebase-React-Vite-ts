import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignWithProvider from "./SignWithProvider";
import { FormDataTypes } from "./typesForm";
import "../../styles/components/auth/authModal.css";
import "../../styles/components/auth/form.css";

const ModalAuth: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = UserAuth();

  const [toggleSignUp, setToggleSignUp] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [formData, setFormData] = useState<FormDataTypes>({
    email: "",
    password: "",
    userName: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onReset = () => {
    setFormData(() => ({
      email: "",
      password: "",
      userName: "",
    }));
  };

  const onCloseModal = (): void => {
    setIsAuthModalOpen(false);
    setToggleSignUp(true);
    onReset();
    setErrorMsg("");
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
        <>
          {toggleSignUp ? (
            <SignUp
              formData={formData}
              setFormData={setFormData}
              onChange={onChange}
              setToggleSignUp={setToggleSignUp}
              onCloseModal={onCloseModal}
            />
          ) : (
            <SignIn
              formData={formData}
              setFormData={setFormData}
              onChange={onChange}
              setToggleSignUp={setToggleSignUp}
              onCloseModal={onCloseModal}
            />
          )}
        </>
        <p>Or continue with :</p>
        <SignWithProvider />
      </div>
    </div>
  );
};

export default ModalAuth;
