import { Navigate, Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ProviderAuth from "./ProviderAuth";
import { auth } from "../../firebase/firebase";

const ForgotPassword = () => {
  if (auth.currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Grid item xs={6}>
      <Box component="form" p={4}>
        <Stack justifyContent="center" spacing={2}>
          <Typography variant="h4" component="h4">
            Forgot password
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="Email"
            // onChange={onChangeTitle}
            required
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
