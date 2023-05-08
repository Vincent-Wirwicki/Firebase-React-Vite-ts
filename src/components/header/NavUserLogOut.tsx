import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link as RouterLink } from "react-router-dom";

const NavUserLogOut = () => {
  return (
    <ButtonGroup variant="text" aria-label="auth group">
      <Button sx={{ color: "white" }} component={RouterLink} to="/auth/signup">
        Sign Up
      </Button>
      <Button sx={{ color: "white" }} component={RouterLink} to="/auth/signin">
        Sign In
      </Button>
    </ButtonGroup>
  );
};

export default NavUserLogOut;
