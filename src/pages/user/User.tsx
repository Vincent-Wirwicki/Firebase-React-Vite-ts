// import {
//   deleteUser,
//   updateEmail,
//   updatePassword,
//   updateProfile,
// } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import { Navigate, useParams, Link as RouterLink } from "react-router-dom";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import UserPhotos from "./UserPhotos";
import { UserRefType } from "../../types/Types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
// import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface Props {}

const User: React.FC<Props> = ({}) => {
  const [user, error, loading] = useAuthState(auth);
  const [userRef, setUserRef] = useState<DocumentData>();
  const [openEditingModal, setOpenEditingModal] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<string>("1");

  const onOpenEditingModal = () => setOpenEditingModal(true);
  const onCloseEditingModal = () => setOpenEditingModal(false);

  const onTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const { uid } = useParams();

  const getUserRef = async () => {
    if (uid) {
      const docRef = doc(db, "users", uid);
      const dataRef = await getDoc(docRef);
      return dataRef.data() as UserRefType;
    }
  };

  useEffect(() => {
    const fetchUserRef = async () => {
      try {
        const dataRef = await getUserRef();
        setUserRef(dataRef);
      } catch (error) {}
    };
    fetchUserRef();
  }, []);

  if (!user) {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }

  return (
    <Grid item xs={12} p={4}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        pt={4}
      >
        <Stack
          direction="row"
          spacing={6}
          // divider={<Divider orientation="vertical" flexItem />}
        >
          <Avatar sx={{ width: 125, height: 125 }}>
            {userRef?.userName.charAt(0)}
          </Avatar>
          <Stack spacing={1} pb={4}>
            <Stack direction="row" spacing={6}>
              <Typography variant="h4" component="h4">
                {userRef?.userName}
              </Typography>
              {userRef &&
              auth.currentUser &&
              userRef.uid === auth.currentUser.uid ? (
                <IconButton
                  color="primary"
                  aria-label="Edit "
                  component={RouterLink}
                  to={"/user/:id/"}
                  onClick={onOpenEditingModal}
                >
                  <EditIcon />
                </IconButton>
              ) : null}
            </Stack>
            <List>
              <ListItem>
                <ListItemText primary={`${userRef?.bio}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${userRef?.country} - ${userRef?.city}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InstagramIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </Stack>
        </Stack>
        <TabContext value={tabValue}>
          <TabList onChange={onTabChange}>
            <Tab label="Photos" value="1" />
            <Tab label="Likes" value="2" />
          </TabList>
          <TabPanel value="1">Photos</TabPanel>
          <TabPanel value="2">Likes</TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};

export default User;
