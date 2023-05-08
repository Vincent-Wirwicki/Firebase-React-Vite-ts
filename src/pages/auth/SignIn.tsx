import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ProviderAuth from "./ProviderAuth";
import { auth } from "../../firebase/firebase";
import { Link } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

interface FormDataType {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const { handleSubmit, control } = useForm<FormDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormDataType) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      if (auth.currentUser) {
        navigate("/");
      }
    } catch (error) {}
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Grid item xs={2} sm={4} md={6}>
      <Box component="form" p={4} onSubmit={handleSubmit(onSubmit)}>
        <Stack justifyContent="center" spacing={2}>
          <Typography variant="h4" component="h4">
            Sign In
          </Typography>
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
          <Stack spacing={1}>
            <Link
              component={RouterLink}
              to="/auth/signup"
              sx={{ color: "inherit" }}
              underline="hover"
            >
              Your already have an account ?
            </Link>
            <Link
              component={RouterLink}
              to="/auth/ForgotPassword"
              sx={{ color: "inherit" }}
              underline="hover"
            >
              Forgot your password ?
            </Link>
          </Stack>
          <ProviderAuth />
        </Stack>
      </Box>
    </Grid>
  );
};

export default SignIn;
