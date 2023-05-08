import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const Root = () => {
  // const [user] = useAuthState(auth);
  return (
    <>
      <Header />
      {/* {!user ? <ModalAuth /> : null} */}
      <Container maxWidth="xl">
        <Grid container spacing={2} mt={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Outlet />
        </Grid>
      </Container>
    </>
  );
};

export default Root;
