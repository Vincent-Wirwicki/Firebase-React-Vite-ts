import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";

const PostEvent = () => {
  const [title, setTitle] = useState<string>("");
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (auth.currentUser !== null) {
        // const docRef = doc(db, "events");
        await addDoc(collection(db, "events"), {
          title,
          userName: auth.currentUser.displayName,
          userId: auth.currentUser.uid,
        });
        console.log("hello");
      }
    } catch (error) {}
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        height: "50px",
        width: "100px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3>Post an Event</h3>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ border: "1px solid black" }}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostEvent;
