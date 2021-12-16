import Snackbar from "@mui/material/Snackbar";
import Alert from "./Alert";

const Toast = ({ open, msg, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="success" sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Toast;