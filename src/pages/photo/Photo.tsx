import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { deleteObject, getStorage, ref } from "firebase/storage";
import useFetchPhoto from "../../hooks/useFetchPhoto";

const Photo = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const { photoRef, userRef } = useFetchPhoto(uid);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onDeletePhoto = async () => {
    if (
      photoRef &&
      uid &&
      auth.currentUser &&
      photoRef.authorId === auth.currentUser.uid
    ) {
      const store = getStorage();
      const storeRef = ref(store, `${photoRef.url}`);
      await deleteObject(storeRef).catch(error => {
        return;
      });
      await deleteDoc(doc(db, "photos", uid));
      if (userRef) {
        navigate(`/user/${userRef.uid}`);
      }
    }
  };

  return (
    <Container>
      <Grid item container columns={3} spacing={2} component="section">
        <Grid item xs={2}>
          <img src={`${photoRef?.url}`} />
        </Grid>
        <Grid item xs={1}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ width: 80, height: 80 }}>
                  {userRef?.userName.charAt(0)}
                </Avatar>
                <Typography
                  variant="body1"
                  component={RouterLink}
                  to={`/user/${userRef?.uid}`}
                  sx={{ color: "inherit" }}
                >
                  {userRef?.userName}
                </Typography>
                <Divider />
              </Stack>
              {photoRef &&
              auth.currentUser &&
              photoRef.authorId === auth.currentUser.uid ? (
                <Stack direction="row">
                  <IconButton
                    component={RouterLink}
                    to={`/photo/${uid}/edit`}
                    color="primary"
                    aria-label="delete picture"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleOpenDialog}
                    color="error"
                    aria-label="delete picture"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ) : null}
            </Stack>
            <Typography variant="h4">{photoRef?.title}</Typography>
            <Typography variant="body1">{photoRef?.description}</Typography>

            {photoRef?.tags.map((tag: string, i: number) => (
              <Chip
                key={i}
                label={tag}
                variant="outlined"
                sx={{ width: "fit-content" }}
              />
            ))}
          </Stack>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this photo?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action cannot be undone. Please confirm by clicking 'Yes'
                below to proceed with the deletion, or click 'Cancel' to keep
                the photo."
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="error">
                Cancel
              </Button>
              <Button onClick={onDeletePhoto} color="success" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Photo;
