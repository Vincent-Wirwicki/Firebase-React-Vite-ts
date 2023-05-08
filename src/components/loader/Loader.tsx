import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";

const Loader = () => {
  return (
    <Grid
      xs={12}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <LinearProgress sx={{ width: "100%" }} />
      <CircularProgress />
    </Grid>
  );
};

export default Loader;
