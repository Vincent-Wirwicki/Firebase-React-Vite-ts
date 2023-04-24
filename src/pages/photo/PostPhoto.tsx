import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  UploadTaskSnapshot,
  uploadBytes,
} from "firebase/storage";
import { PhotoDataType } from "../../types/Types";
// import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Navigate, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

interface FormDataType {
  title: string;
  description?: string;
  tags?: string[];
  image?: FileList | null;
  // url: string | void | undefined;
}

const PostPhoto = () => {
  const navigate = useNavigate();
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);

  const { handleSubmit, control, register } = useForm<FormDataType>({
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
    mode: "onBlur",
  });

  const onAddTag = () => {
    setTags(prevState => [...prevState, tag]);
    setTag("");
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

  const onSubmit = async (data: FormDataType) => {
    try {
      if (auth.currentUser && data.image) {
        const store = getStorage();
        const fileName = `${generateRandomString()}-${data.image[0].name}`;
        const storeRef = ref(
          store,
          `images/${auth.currentUser.uid}/${fileName}`
        );
        await uploadBytes(storeRef, data.image[0]).catch(error => {
          console.log(error);
          return;
        });
        const url = await getDownloadURL(storeRef);
        const docRef = await addDoc(collection(db, "photos"), {
          title: data.title,
          description: data.description,
          author: auth.currentUser.displayName,
          authorId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          tags: tags,
          likes: 0,
          url: url,
        } as PhotoDataType);
        navigate(`/photo/${docRef.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTag(e.target.value);

  if (!auth.currentUser) {
    return <Navigate to="/auth/signup" />;
  }

  return (
    <Grid item xs={8}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "50%" }}
      >
        <Stack spacing={2}>
          <Typography variant="h4" component="h4">
            Post your photo
          </Typography>
          <Controller
            name="title"
            control={control}
            rules={{
              required: true,
              max: 180,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                autoComplete="true"
                label="title"
                variant="outlined"
                type="title"
                error={error !== undefined}
                helperText={error ? error.type === "" : ""}
                required
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: true,
              max: 180,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="description"
                variant="outlined"
                type="text"
                placeholder="description"
                multiline
                rows={4}
              />
            )}
          />
          <Stack direction="row" spacing={2}>
            <TextField
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
              {tags.map((tag, i) => (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CloseIcon />}
                  key={i}
                  onClick={onRemoveTag}
                >
                  {tag}
                </Button>
              ))}
            </Stack>
          ) : (
            <div>no tag</div>
          )}
          <Button variant="outlined" component="label">
            Upload
            <input
              {...register("image", { required: true })}
              name="image"
              style={{ display: "none" }}
              accept=".jpg,.png,.jpeg"
              maxLength={1}
              type="file"
            />
          </Button>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

export default PostPhoto;
