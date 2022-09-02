import { Box, CircularProgress, Dialog, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

export interface IFeedback {
  open: boolean;
  onClose?: () => void;
  message?: string;
  severity?: AlertColor;
}

export function Fallback(props: IFeedback) {
  return (
    <Dialog open={props.open}
      PaperProps={{ elevation: 0, style: { background: 'transparent' } }}
    >
      <Box alignItems='center' display='flex' flexDirection='column' >
        <CircularProgress color='secondary' />
        <Typography color='text.contrastText'>
          잠시만 기다려주세요.
        </Typography>
      </Box>
    </Dialog>
  )
}

export function Toast(props: IFeedback) {
  const handleClose = () => {
    props.onClose?.();
  };
  const severity = props?.severity  ?  props?.severity : 'success';
  return (
    <>
    {
      console.log(props?.severity)
    }
    <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="filled" severity={severity}  onClose={handleClose}>{props?.message}</Alert>
    </Snackbar>
    </>
  )
}