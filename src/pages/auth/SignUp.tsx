import { Link as RouterLink, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ProviderAuth from "./ProviderAuth";
import Grid from "@mui/material/Grid";
import { auth, db } from "../../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

interface FormDataType {
  userName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormDataType>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const errorHelper = {
    userName: {
      required: "UserName is required",
    },
    email: {
      required: "Email is required",
      pattern: "Invalid email adress",
    },
    password: {
      required: "Password is required",
    },
  };
  // console.log(Object.keys(errorHelper.userName));

  const onSubmit = async (data: FormDataType) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, { displayName: data.userName });
      const docRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(docRef, {
        uid: auth.currentUser.uid,
        userName: data.userName,
        city: "",
        country: "",
        social: "",
        bio: "",
        photoURL: auth.currentUser.photoURL,
        createdAt: serverTimestamp(),
      });
      navigate("/");
    }
  };

  // if (auth.currentUser) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Grid item xs={6}>
      <Box component="form" p={4} onSubmit={handleSubmit(onSubmit)}>
        <Stack justifyContent="center" spacing={2}>
          <Typography variant="h4" component="h4">
            Sign In
          </Typography>
          <Controller
            name="userName"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="User name"
                variant="outlined"
                type="text"
                error={error !== undefined}
                helperText={error ? error.type === "" : ""}
                required
              />
            )}
          />
          {/* error ? errorHelper.userName[error.type] : "" */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                autoComplete="true"
                label="email"
                variant="outlined"
                type="email"
                error={error !== undefined}
                helperText={error ? error.type === "" : ""}
                required
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                autoComplete="true"
                label="password"
                variant="outlined"
                type="password"
                error={error !== undefined}
                helperText={error ? error.type : ""}
                required
              />
            )}
          />
          <Button variant="contained" type="submit">
            Sign In
          </Button>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1" sx={{ color: "inherit" }}>
              Don't have an account ?
            </Typography>
            <Typography
              variant="subtitle1"
              component={RouterLink}
              to="/auth/signin"
              sx={{ color: "inherit" }}
            >
              Sign In
            </Typography>
          </Stack>
          <ProviderAuth />
        </Stack>
      </Box>
    </Grid>
  );
};

export default SignUp;
