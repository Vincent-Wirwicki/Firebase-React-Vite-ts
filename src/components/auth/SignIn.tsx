import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";

const SignIn = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const userCollectionRef = collection(db, "users");

  const addUserToFirestore = async () => {
    if (auth.currentUser !== null) {
      updateProfile(auth.currentUser, { displayName: userName });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: email,
        userName: userName,
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      addUserToFirestore();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        autoComplete="true"
        placeholder="user name"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        type="text"
      />
      <input
        autoComplete="true"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="text"
      />
      <input
        autoComplete="true"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="text"
      />
      <button type="submit">Sign IN</button>
    </form>
  );
};

export default SignIn;
