import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import ProviderAuth from "./ProviderAuth";
import { auth } from "../../firebase/firebase";
import { useForm, Controller } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";

interface FormDataType {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormDataType>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: FormDataType) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      navigate("/auth/signin");
    } catch (error) {}
  };
  if (auth.currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Grid item xs={6}>
      <Box component="form" p={4} onSubmit={handleSubmit(onSubmit)}>
        <Stack justifyContent="center" spacing={2}>
          <Typography variant="h4" component="h4">
            Forgot password
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
          <Button variant="contained">Sign In</Button>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1" sx={{ color: "inherit" }}>
                Already have an account ?
              </Typography>
              <Typography
                variant="subtitle1"
                component={RouterLink}
                to="/auth/signup"
                sx={{ color: "inherit" }}
              >
                Sign Up
              </Typography>
            </Stack>
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
                Send
              </Typography>
            </Stack>
          </Stack>
          <ProviderAuth />
        </Stack>
      </Box>
    </Grid>
  );
};

export default ForgotPassword;
