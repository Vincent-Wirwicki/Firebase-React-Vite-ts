import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";
import { AuthFormPropsType } from "./typesForm";

const SignIn: React.FC<AuthFormPropsType> = ({
  formData,
  setFormData,
  onChange,
  setToggleSignUp,
  onCloseModal,
}) => {
  const { userName, email, password } = formData;
  const onSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h3>Register</h3>
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
        type="text"
        required
      />
      <button type="submit">Sign In</button>
      <p>
        You don't have an account ?
        <a onClick={() => setToggleSignUp(true)}>Register</a>
      </p>
    </form>
  );
};

export default SignIn;
