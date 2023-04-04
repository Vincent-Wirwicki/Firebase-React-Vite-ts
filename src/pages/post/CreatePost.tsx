import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";
import "../../styles/pages/post/post.css";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [image, setImage] = useState<FileList | null>();
  const [url, setUrl] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>();
  const [isUploadError, setIsUploadError] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  interface dataFType {
    description: string;
    title: string;
    tag: Array<string>;
  }

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

  const uploadImage = () => {
    if (image) {
      setIsUploadSuccess(false);
      const store = getStorage();
      const fileName = `${image[0].name}--`;
      const storeRef = ref(store, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storeRef, image[0]);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
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
          setIsUploadSuccess(false);
          // reject(error);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setUrl(downloadURL);
            setIsUploadSuccess(true);
            // resolve(downloadURL);
          });
        }
      );
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (auth.currentUser) {
        // const docRef = doc(db, "events");
        uploadImage();
        await addDoc(collection(db, "posts"), {
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

  return (
    <div className="post__wrap">
      <form className="post__form" onSubmit={onSubmit}>
        Post your photo
        <input
          type="text"
          placeholder="title"
          className="form__input"
          onChange={e => setTitle(e.target.value)}
          required
          minLength={6}
          maxLength={60}
        />
        <input
          type="text"
          placeholder="description"
          className="form__input"
          onChange={e => setDescription(e.target.value)}
          required
        />
        <div className="post__tag__wrap">
          <input
            type="text"
            value={tag}
            onChange={e => {
              setTag(e.target.value);
            }}
            placeholder="tags"
            className="form__input post__tag__input"
            // required
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
