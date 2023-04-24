import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  onCloseEditingModal: () => void;
  openEditingModal: boolean;
  userRef?: DocumentData;
}

const UpdateUser: React.FC<Props> = ({
  onCloseEditingModal,
  openEditingModal,
  userRef,
}) => {
  const [hasChanged, setHasChanged] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    ...userRef,
  });
  const navigate = useNavigate();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = (e.target as HTMLInputElement).dataset;
    if (value !== undefined) {
      setFormData(prevState => ({
        ...prevState,
        [value]: e.target.value,
      }));
    }
    compareUpdates();
    console.log(hasChanged);
  };

  const compareUpdates = () => {
    for (const key in userRef) {
      userRef[key] !== formData[key]
        ? setHasChanged(false)
        : setHasChanged(true);
      if (userRef.hasOwnProperty(key) && formData.hasOwnProperty(key)) {
      }
      // console.log(formData, userRef);
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (auth.currentUser !== null) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const { bio, city } = formData;
      await updateDoc(docRef, { bio, city });
      // setEditing(false);
      redirect("/user");
    }
  };

  return (
    <>
      <Modal open={openEditingModal} onClose={onCloseEditingModal}>
        <Box sx={style}>
          <IconButton
            color="primary"
            aria-label="close "
            component="label"
            onClick={onCloseEditingModal}
            sx={{ width: 50, height: 50, p: 0.5 }}
          >
            <CloseIcon />
          </IconButton>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Typography
              variant="h4"
              component="h4"
              pb={2}
              sx={{ border: "solid primary 1px" }}
            >
              Update Profile
            </Typography>
            <TextField
              id="outlined-basic"
              label="User name"
              variant="outlined"
              type="text"
              placeholder="User name"
              fullWidth
              // onChange={onChangeTitle}
            />
            <TextField
              id="outlined-basic"
              label="bio"
              variant="outlined"
              type="text"
              placeholder="bio"
              fullWidth
              // onChange={onChangeTitle}
            />
            <TextField
              id="outlined-basic"
              label="city"
              variant="outlined"
              type="text"
              placeholder="city"

              // onChange={onChangeTitle}
            />
            <TextField
              id="outlined-basic"
              label="country"
              variant="outlined"
              type="text"
              placeholder="country"
              // onChange={onChangeTitle}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Submit changes
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateUser;
