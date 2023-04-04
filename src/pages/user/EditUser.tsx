import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import "../../styles/pages/user/EditUser.css";
import "../../styles/pages/user/EditUser.css";

interface Props {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userRef: DocumentData;
}

const UpdateUser: React.FC<Props> = ({ setEditing, userRef }) => {
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    ...userRef,
  });
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = (e.target as HTMLInputElement).dataset;
    if (value !== undefined) {
      setFormData(prevState => ({
        ...prevState,
        [value]: e.target.value,
      }));
    }
    compareUpdates();
    console.log(hasChanged);
  };

  const compareUpdates = () => {
    for (const key in userRef) {
      userRef[key] !== formData[key]
        ? setHasChanged(false)
        : setHasChanged(true);
      if (userRef.hasOwnProperty(key) && formData.hasOwnProperty(key)) {
      }
      // console.log(formData, userRef);
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (auth.currentUser !== null) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const { bio, city } = formData;
      await updateDoc(docRef, { bio, city });
      setEditing(false);
      redirect("/user");
    }
  };

  return (
    <div className="user__edit__modal">
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          data-value="userName"
          placeholder="userName"
          id="userName"
          value={formData.userName}
          onChange={e => onChange(e)}
        />
        <input
          type="text"
          placeholder="bio"
          data-value="bio"
          value={formData.bio}
          onChange={e => onChange(e)}
        />
        <input
          type="text"
          placeholder="city"
          data-value="city"
          value={formData.city}
          onChange={e => onChange(e)}
        />
        <input
          type="text"
          placeholder="country"
          data-value="country"
          value={formData.country}
          onChange={e => onChange(e)}
        />
        <input type="text" placeholder="instagram" />
        <button>submit changes</button>
        <button type="button" onClick={() => setEditing(false)}>
          cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
