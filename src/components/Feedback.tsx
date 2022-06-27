import { Box, CircularProgress, Dialog, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

export interface IFeedback {
    open: boolean;
    onClose?: () => void;
    message?: string;
    severity?: AlertColor;
}

export function Fallback(props:IFeedback) {
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

export function Toast(props:IFeedback) {
  const handleClose = () => {
    props.onClose?.();
  };

  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
    <Alert variant="filled" severity={props.severity} onClose={handleClose}>{props?.message}</Alert>
  </Snackbar>
  )
}

/*
case const:
import { FC } from "react";
export const Fallback: FC<{ open: any; }> = ({ open }) => {
export const Fallback: FC<IFallback> = ({ open }) => {
*/
// export function Fallback;
// export function Toast;
/*
sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }, }}
style=>, display: 'flex', justifyContent: 'center', alignItems: 'center'
*/