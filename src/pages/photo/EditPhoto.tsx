import {
  useNavigate,
  useParams,
  Link as RouterLink,
  Navigate,
} from "react-router-dom";
import useFetchPhoto from "../../hooks/useFetchPhoto";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { auth } from "../../firebase/firebase";

const EditPhoto = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const { photoRef, userRef } = useFetchPhoto(uid);
  const [update, setUpdate] = useState({ ...photoRef });

  if (userRef && auth.currentUser && userRef.uid !== auth.currentUser.uid) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Grid item container columns={3} spacing={2}>
        <Grid item xs={2}>
          <img src={`${photoRef?.url}`} />
        </Grid>
        <Grid item xs={1}>
          <Stack spacing={2}>
            <TextField
              autoComplete="true"
              label="title"
              variant="outlined"
              type="title"
            />
            <TextField
              autoComplete="true"
              label="description"
              variant="outlined"
              type="description"
              placeholder="description"
              multiline
              rows={4}
            />
            <TextField
              autoComplete="true"
              label="tag"
              variant="outlined"
              type="tag"
            />
            <TextField
              autoComplete="true"
              label="title"
              variant="outlined"
              type="title"
            />

            <Button
              onClick={() => navigate(-1)}
              variant="contained"
              color="success"
            >
              Submit
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditPhoto;
