import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { PhotoDataType, UserRefType } from "../types/Types";

const useFetchPhoto = (uid: string | undefined) => {
  const [photoRef, setPhotoRef] = useState<DocumentData>();
  const [userRef, setUserRef] = useState<DocumentData>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataRef = async () => {
      try {
        if (uid) {
          const docRef = doc(db, "photos", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPhotoRef(docSnap.data() as PhotoDataType);
            const author = docSnap.data().authorId;
            const userRef = doc(db, "users", author);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setUserRef(userSnap.data() as UserRefType);
            } else {
              navigate("/");
            }
          } else {
            navigate("/");
          }
        }
      } catch (error) {}
    };
    fetchDataRef();
  }, []);
  return { photoRef, userRef };
};

export default useFetchPhoto;
