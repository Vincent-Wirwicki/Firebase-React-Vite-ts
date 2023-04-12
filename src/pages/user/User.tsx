import {
  deleteUser,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import { Navigate, useParams } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import "../../styles/pages/user/user.css";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import EditUser from "./EditUser";
import UserPhotos from "./UserPhotos";
import { UserRefType } from "../../types/Types";

const User = () => {
  const [user, error, loading] = useAuthState(auth);
  const [userRef, setUserRef] = useState<DocumentData>();
  const [editing, setEditing] = useState<boolean>(false);
  const { uid } = useParams();

  const getUserRef = async () => {
    if (uid) {
      const docRef = doc(db, "users", uid);
      const dataRef = await getDoc(docRef);
      return dataRef.data() as UserRefType;
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
            <h3 className="user__page__info__data__text">
              {userRef?.userName}
            </h3>
            <p className="user__page__info__data__text">{userRef?.bio}</p>
            <h3 className="user__page__info__data__text">
              {userRef?.country} - {userRef?.city}
            </h3>
            <h3 className="user__page__info__data__text">{userRef?.city}</h3>
            <h3 className="user__page__info__data__text">{userRef?.social}</h3>
          </div>
          {/* <div className="user__page__info__data__text">{user?.uid}</div> */}
        </div>
        <div className="user__page__wrap__info__edit">
          {userRef &&
          auth.currentUser &&
          userRef.uid === auth.currentUser.uid ? (
            <button onClick={() => setEditing(true)}>Edit</button>
          ) : null}
          {editing && userRef ? (
            <EditUser setEditing={setEditing} userRef={userRef} />
          ) : null}
        </div>
        {/* <DeleteUser email={user.email} /> */}
        <div className="user__page__wrap__post__likes">
          <div>photos</div>
          <div>likes</div>
        </div>
        {userRef ? <UserPhotos userRef={userRef.uid} /> : null}
      </div>
    </div>
  );
};

export default User;
