import {
  deleteUser,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import "../../styles/pages/user/user.css";
import { doc, getDoc, DocumentData } from "firebase/firestore";

interface userRef {
  bio: string;
  city: string;
  country: string;
  email: string;
}

const User = () => {
  const [user, error, loading] = useAuthState(auth);
  const [userRef, setUserRef] = useState<DocumentData>();
  const [editing, setEditing] = useState<boolean>(false);

  // updateProfile(auth.currentUser, {
  //   displayName: "Jane Q. User",
  //   photoURL: "https://example.com/jane-q-user/profile.jpg",
  // });
  // updateEmail(auth.currentUser, "user@example.com");
  // updatePassword(user, newPassword);
  // deleteUser(user);
  const getUserRef = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const dataRef = await getDoc(docRef);
      return dataRef.data();
    }
  };

  useEffect(() => {
    const fetchUserRef = async () => {
      try {
        const dataRef = await getUserRef();
        setUserRef(dataRef);
      } catch (error) {}
    };
    fetchUserRef();
  }, []);

  if (!user) {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }

  return (
    <div className="user__page__container">
      <div className="user__wrap">
        <div className="user__page__wrap__info">
          <img className="user__page__info__data__photo" alt="photo" />
          <div>
            <h3 className="user__page__info__data__text">{user.displayName}</h3>
            <h3 className="user__page__info__data__text">
              {userRef?.userName}
            </h3>
          </div>
          {/* <div className="user__page__info__data__text">{user?.uid}</div> */}
        </div>
        <div className="user__page__wrap__info__edit">
          <input type="email" />
        </div>
        <DeleteUser email={user.email} />
        <div>photos</div>
        <div>likes</div>
      </div>
    </div>
  );
};

export default User;
