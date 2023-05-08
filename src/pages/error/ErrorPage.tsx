import { useRouteError } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Grid
      item
      xs={4}
      sm={8}
      md={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="body1">
        Sorry, an unexpected error has occurred.
      </Typography>
    </Grid>
  );
};

export default ErrorPage;
