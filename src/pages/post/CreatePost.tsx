import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";
import "../../styles/pages/post/post.css";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);

  interface dataFType {
    description: string;
    title: string;
    tag: Array<string>;
  }

  const [dataForm, setDataForm] = useState<dataFType>({
    description: "",
    title: "",
    tag: [],
  });

  const onAddTag = () => {
    if (tags.length < 7 && tag.length > 3) {
      setTags(prevState => [...prevState, tag]);
      setTag("");
    } else {
    }
  };

  const onRemoveTag = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (tags.length > 0) {
      setTags(prevState => [
        ...prevState.filter(
          tag => tag !== (e.target as HTMLParagraphElement).textContent
        ),
      ]);
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (auth.currentUser !== null) {
        // const docRef = doc(db, "events");
        await addDoc(collection(db, "photos"), {
          author: auth.currentUser.displayName,
          authorId: auth.currentUser.uid,
          title,
          description,
          createdAt: serverTimestamp(),
          tags: tags,
          likes: 0,
        });
      }
    } catch (error) {}
  };

  return (
    <div className="post__wrap">
      <form className="post__form">
        Post your photo
        <input
          type="text"
          placeholder="title"
          className="form__input"
          required
        />
        <input
          type="text"
          placeholder="description"
          className="form__input"
          required
        />
        <div className="post__tag__wrap">
          <input
            type="text"
            value={tag}
            onChange={e => {
              setTag(e.target.value);
              console.log(tag.length);
            }}
            placeholder="tags"
            className="form__input post__tag__input"
            required
          />
          <button type="button" onClick={onAddTag}>
            +{" "}
          </button>
        </div>
        {tags.length > 0 ? (
          <div>
            {tags.map((t, i) => (
              <p key={i} onClick={onRemoveTag}>
                {t}
              </p>
            ))}
          </div>
        ) : (
          <div>no tag</div>
        )}
        {/* <button type="submit">submit</button> */}
        <input type="file" accept=".jpg,.png,.jpeg" maxLength={1} />
      </form>
    </div>
  );
};

export default CreatePost;
