import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { UserAuth } from "../../context/AuthContext";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const CRUDoperation = () => {
  const [displayData, setDisplayData] = useState();
  const [userUid, setUserUid] = useState();
  const [name, setName] = useState("default name");
  const [email, setEmail] = useState("default email");
  const useCollectionRef = collection(db, "users");

  const t = auth.currentUser;

  const createUser = async () => {
    await addDoc(useCollectionRef, {
      name: name,
      message: email,
      userUid: t?.uid,
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await getDocs(useCollectionRef);
      console.log(res);
      console.log(res.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    try {
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <input
        className=""
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={createUser}>Send </button>
      {displayData}
    </div>
  );
};

export default CRUDoperation;
