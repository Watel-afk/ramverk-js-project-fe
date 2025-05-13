import { Alert } from "@mui/material";
import MUISnackbar, {
  SnackbarCloseReason,
  SnackbarProps,
} from "@mui/material/Snackbar";
import { useState } from "react";

const Snackbar = ({
  message,
  severity = "error",
  onClose,
  props,
}: {
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
  props?: SnackbarProps;
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
    setOpen(false);
  };

  return (
    <MUISnackbar
      {...props}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={3000}
      open={open}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;
