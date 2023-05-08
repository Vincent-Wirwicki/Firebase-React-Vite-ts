import { Link as RouterLink } from "react-router-dom";
import { User, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import React, { useState } from "react";

interface Props {
  user: User;
}

const NavUserLogin: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          //   src={user.photoURL}
          //   alt={user?.displayName}
          sx={{ width: 32, height: 32 }}
        ></Avatar>
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
        <MenuItem
          onClick={handleClose}
          component={RouterLink}
          to={`/user-settings/${user.uid}`}
        >
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
  );
};

export default NavUserLogin;
