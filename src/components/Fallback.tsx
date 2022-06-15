import { Box, CircularProgress, Dialog, Typography } from "@mui/material";

interface IFallback {
    open: boolean;
}

function Fallback(props:IFallback) {
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
/*
case const:
import { FC } from "react";
export const Fallback: FC<{ open: any; }> = ({ open }) => {
export const Fallback: FC<IFallback> = ({ open }) => {
*/
export default Fallback;
/*
sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }, }}
style=>, display: 'flex', justifyContent: 'center', alignItems: 'center'
*/