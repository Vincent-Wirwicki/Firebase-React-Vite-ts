import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

interface Props {
  value: string;
  label: string;
}

const EditInputForm: React.FC<Props> = ({ value, label }) => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Box>
      <Stack spacing={2} pt={2}>
        <Stack direction="row" spacing={1}>
          <TextField
            variant="outlined"
            label={label}
            type="text"
            disabled={disabled}
            id={value}
          />
          <IconButton
            sx={{ width: 50, height: 50 }}
            color="primary"
            onClick={() => setDisabled(false)}
          >
            <EditIcon />
          </IconButton>
        </Stack>
        {!disabled ? (
          <Stack direction="row">
            <IconButton
              sx={{ width: 40, height: 40 }}
              color="error"
              onClick={() => setDisabled(true)}
            >
              <ClearIcon />
            </IconButton>
            <IconButton sx={{ width: 40, height: 40 }} color="success">
              <DoneIcon />
            </IconButton>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
};

export default EditInputForm;
