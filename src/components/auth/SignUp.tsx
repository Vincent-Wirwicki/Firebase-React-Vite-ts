import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import "../../styles/components/auth/form.css";
import { AuthFormPropsType } from "./typesForm";

const SignUp: React.FC<AuthFormPropsType> = ({
  formData,
  setFormData,
  onChange,
  setToggleSignUp,
  onCloseModal,
}) => {
  const { userName, email, password } = formData;
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
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      addUserToFirestoreDB();
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
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
      <button type="submit">Sign Up</button>
      <p>
        You already have an account ?
        <a onClick={() => setToggleSignUp(false)}> Login</a>
      </p>
    </form>
  );
};

export default SignUp;
