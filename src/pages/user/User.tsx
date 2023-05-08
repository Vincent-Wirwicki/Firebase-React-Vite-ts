import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  DocumentData,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { DocPhotosType, PhotoDataType, UserRefType } from "../../types/Types";
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
import PhotosGrid from "../../components/ui/PhotosGrid";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {}

const User: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const { uid } = useParams();
  // const [user, error, loading] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [userRef, setUserRef] = useState<DocumentData>();
  const [photosRef, setPhotosRef] = useState<Array<DocPhotosType> | undefined>(
    []
  );
  const [tabValue, setTabValue] = useState<string>("1");
  const onTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (uid) {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          const photosRef = collection(db, "photos");
          const q = query(
            photosRef,
            where("authorId", "==", uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const photos: Array<DocPhotosType> = [];
          querySnapshot.forEach(doc => {
            return photos.push({
              id: doc.id,
              data: doc.data() as PhotoDataType,
            });
          });
          setPhotosRef(photos);
          if (docSnap.exists()) {
            setUserRef(docSnap.data() as UserRefType);
            setLoading(false);
          } else {
            navigate("/");
          }
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Grid
        item
        xs={4}
        sm={8}
        md={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LinearProgress sx={{ width: "100%" }} />
        {/* <CircularProgress /> */}
      </Grid>
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
                  to={`/user-settings/${userRef.uid}`}
                  // onClick={onOpenEditingModal}
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
          <TabPanel value="1">
            {photosRef && userRef ? (
              <PhotosGrid photos={photosRef} user={userRef} />
            ) : (
              <div> Something went wrong</div>
            )}
          </TabPanel>
          <TabPanel value="2">Likes</TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};

export default User;
