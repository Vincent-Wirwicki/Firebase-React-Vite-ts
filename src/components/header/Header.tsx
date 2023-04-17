import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/firebase";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

interface Props {}

const Header = () => {
  const { setToggleModal } = AuthModal();
  const [user, error, loading] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" component="header">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div id="logo">
          <Typography
            variant="h4"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            .Logo
          </Typography>
        </div>
        <nav>
          <Button variant="contained" component={RouterLink} to="/createPost">
            Post your photo
          </Button>
          {user ? (
            <>
              <IconButton
                size="large"
                aria-label="current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                {/* <AccountCircle /> */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to={`/user/${user.uid}`}
                >
                  <AccountCircle />
                  <Typography variant="body2" ml={1}>
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/">
                  <Settings />
                  <Typography variant="body2" ml={1}>
                    Settings
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    signOut(auth);
                  }}
                  component={RouterLink}
                  to="/"
                >
                  <Logout />
                  <Typography variant="body2" ml={1}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <ButtonGroup variant="text" aria-label="auth group">
              <Button
                sx={{ color: "white" }}
                component={RouterLink}
                to="/auth/signup"
              >
                Sign Up
              </Button>
              <Button
                sx={{ color: "white" }}
                component={RouterLink}
                to="/auth/signin"
              >
                Sign In
              </Button>
            </ButtonGroup>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
