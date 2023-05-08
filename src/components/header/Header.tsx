import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import NavUserLogin from "./NavUserLogin";
import NavUserLogOut from "./NavUserLogOut";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useColorMode } from "../../context/ColorMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface Props {}

const Header = () => {
  // const { setToggleModal } = AuthModal();
  const [user] = useAuthState(auth);
  const theme = useTheme();
  const { colorMode, mode } = useColorMode();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="sticky" component="header">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          .Logo
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="baseline"
          component="nav"
        >
          <IconButton
            // color="secondary"
            sx={{
              color: "#fafafa",
            }}
            // variant="contained"
            component={RouterLink}
            to="/PostPhoto"
          >
            <AddAPhotoIcon />
          </IconButton>
          <IconButton
            // color="secondary"
            sx={{ color: "#fafafa" }}
            onClick={colorMode.toggleColorMode}
          >
            {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          {user ? <NavUserLogin user={user} /> : <NavUserLogOut />}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
