import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Component, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";
import "../../styles/pages/post/post.css";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { PhotoDataType } from "../../types/Types";
import { TextField, Button, Box, Stack, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [image, setImage] = useState<FileList | null>();
  const [formRules, setFormRules] = useState({
    isInputValide: false,
  });

  const checkInput = (
    value: string,
    minLength: number,
    maxLength: number,
    reg?: RegExp
  ) => {
    const [isValid, setIsValid] = useState(false);
    value.length > minLength && value.length < maxLength
      ? setIsValid(true)
      : setIsValid(false);
    return [isValid];
  };

  const onAddTag = () => {
    if (tags.length < 20 && tag.length > 3) {
      setTags(prevState => [...prevState, tag]);
      setTag("");
    } else {
    }
  };

  const onRemoveTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (tags.length > 0) {
      setTags(prevState => [
        ...prevState.filter(
          tag => tag !== (e.target as HTMLButtonElement).textContent
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
          // snapshot => {
          //   // Observe state change events such as progress, pause, and resume
          //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          //   const progress =
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   // console.log("Upload is " + progress + "% done");
          //   switch (snapshot.state) {
          //     case "paused":
          //       console.log("Upload is paused" + progress);
          //       break;
          //     case "running":
          //       console.log("Upload is running" + progress);
          //       break;
          //   }
          // },
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
        console.log("ghakofakpozkf");
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
        } as PhotoDataType);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTag(e.target.value);

  // if(!auth.currentUser){
  //   ret
  // }

  return (
    <div className="post__wrap">
      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2}>
          Post your photo
          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            type="text"
            placeholder="title"
            onChange={onChangeTitle}
            required
          />
          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            type="text"
            placeholder="description"
            onChange={onChangeDescription}
            value={description}
            multiline
          />
          <Stack direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="text"
              label="tag"
              placeholder="tag"
              value={tag}
              onChange={onChangeTag}
            />
            <Button
              onClick={onAddTag}
              startIcon={<AddIcon />}
              component="button"
            >
              add tag
            </Button>
          </Stack>
          {tags.length > 0 ? (
            <Stack direction="row" spacing={1}>
              {tags.map((t, i) => (
                <Button
                  variant="outlined"
                  size="small"
                  key={i}
                  onClick={onRemoveTag}
                >
                  {t}
                </Button>
              ))}
            </Stack>
          ) : (
            <div>no tag</div>
          )}
          {/* <button type="submit">submit</button> */}
          <Button variant="outlined" component="label">
            Upload
            <input
              style={{ display: "none" }}
              accept=".jpg,.png,.jpeg"
              maxLength={1}
              type="file"
              onChange={e => {
                const file = e.target.files;
                if (file && file.length === 1) {
                  console.log(file);
                  setImage(file);
                }
              }}
            />
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default CreatePost;
