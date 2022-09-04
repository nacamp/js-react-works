import { Box, CircularProgress, Dialog, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

export function Fallback({ open }: { open: boolean }) {
  return (
    <Dialog
      open={open}
      PaperProps={{ elevation: 0, style: { background: "transparent" } }}
    >
      <Box alignItems="center" display="flex" flexDirection="column">
        <CircularProgress color="secondary" />
        <Typography color="text.contrastText">잠시만 기다려주세요.</Typography>
      </Box>
    </Dialog>
  );
}

export interface IToast {
  open: boolean;
  severity: AlertColor;
  message: string;
  onClose?: () => void;
}

export function Toast({open, severity, message, onClose}: IToast) {
  const handleClose = () => {
    onClose?.();
  };
  //const severity = props?.severity ? props?.severity : "success";
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
