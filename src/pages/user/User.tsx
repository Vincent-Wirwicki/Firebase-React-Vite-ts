import {
  deleteUser,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import "../../styles/pages/user/user.css";

const User = () => {
  const [user, error, loading] = useAuthState(auth);
  const [editing, setEditing] = useState<boolean>(false);

  // updateProfile(auth.currentUser, {
  //   displayName: "Jane Q. User",
  //   photoURL: "https://example.com/jane-q-user/profile.jpg",
  // });
  // updateEmail(auth.currentUser, "user@example.com");
  // updatePassword(user, newPassword);
  // deleteUser(user);

  if (!user) {
    return (
      <div>
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <div className="user__page__container">
      <button
        onClick={() => {
          setEditing(!editing);
        }}
      >
        Edit profile
      </button>
      <div className="user__page__wrap__info">
        <div className="user__page__info__data__title">Display name:</div>
        <div className="user__page__info__data__text">{user.displayName}</div>
        <div className="user__page__info__data__title">Email</div>
        <div className="user__page__info__data__text">{user.email}</div>
        {/* <div className="user__page__info__data__text">{user?.uid}</div> */}
      </div>
      <div className="user__page__wrap__info__edit">
        <input type="email" />
      </div>
      <DeleteUser email={user.email} />
    </div>
  );
};

export default User;
