import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";
import "../../styles/pages/post/post.css";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import Input from "../../components/ui/Input";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [image, setImage] = useState<FileList | null>();

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

  const generateRandomString = () => {
    const charSet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * (12 - 8 + 1) + 8);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return result;
  };

  const uploadImage = async () => {
    if (image) {
      return new Promise((resolve, reject) => {
        const store = getStorage();
        const fileName = `${generateRandomString()}-${image[0].name}`;
        const storeRef = ref(store, `images/${fileName}`);
        const uploadTask = uploadBytesResumable(storeRef, image[0]);
        uploadTask.on(
          "state_changed",
          snapshot => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          error => {
            reject(error);
            return;
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (auth.currentUser) {
        const url = await uploadImage();
        await addDoc(collection(db, "photos"), {
          author: auth.currentUser.displayName,
          authorId: auth.currentUser.uid,
          title,
          description,
          createdAt: serverTimestamp(),
          tags: tags,
          likes: 0,
          url,
        });
      }
    } catch (error) {}
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTag(e.target.value);

  return (
    <div className="post__wrap">
      <form className="post__form" onSubmit={onSubmit}>
        Post your photo
        <Input
          value={title}
          type="text"
          placeHolder={"title"}
          onChange={onChangeTitle}
        />
        <Input
          value={description}
          type="text"
          placeHolder={"description"}
          onChange={onChangeDescription}
        />
        <div className="post__tag__wrap">
          <Input
            value={tag}
            type="text"
            placeHolder={"tag"}
            onChange={onChangeTag}
          />
          <button type="button" onClick={onAddTag}>
            +
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
        <input
          type="file"
          onChange={e => {
            const file = e.target.files;
            if (file) {
              setImage(file);
            }
          }}
          accept=".jpg,.png,.jpeg"
          maxLength={1}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
