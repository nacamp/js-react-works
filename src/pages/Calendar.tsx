import React, { useState } from "react";
import "dayjs/locale/ko";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { TodoTemplate, TodoTitle } from "../containers/TodoTemplate";
import { useGetTodo, usePutTodo, usePostTodo } from "../hooks/api";
import { Calendar } from "../components/Calendar";

export interface SimpleDialogProps {
  open: boolean;
  todoId: number;
  onClose: () => void;
}

function TodoDialog(props: SimpleDialogProps) {
  const { onClose, open, todoId } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    //sx={{ bgcolor: 'white' }}
    <Dialog onClose={handleClose} open={open} fullScreen>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Close
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 2 }}>
        <TodoTemplate
          id={todoId}
          onGet={useGetTodo}
          onPut={usePutTodo}
          onPost={usePostTodo}
        >
          {" "}
          <TodoTitle id={todoId} />
        </TodoTemplate>
      </Box>
    </Dialog>
  );
}

function CalendarPage({ yearMonth }: { yearMonth: string }) {
  const years = ["2022", "2023", "2024"];
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const [year, setYear] = React.useState(yearMonth.substring(0, 4));
  const [month, setMonth] = React.useState(yearMonth.substring(4, 6));
  const [open, setOpen] = useState(false);
  const [todoId, setTodoId] = useState(0);

  const handleYear = (event: any) => {
    setYear(event.target.value as string);
  };
  const handleMonth = (event: any) => {
    setMonth(event.target.value as string);
  };
  function handleClose() {
    setOpen(false);
  }
  function handleOpen(id: number) {
    setOpen(true);
    setTodoId(id);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl variant="standard" sx={{ m: 1, mt: 2, minWidth: 100 }}>
            <Select value={year} label="분류" onChange={handleYear}>
              {years.map((row, i) => (
                <MenuItem key={i} value={row}>
                  {row}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="standard" sx={{ m: 1, mt: 2, minWidth: 100 }}>
            <Select value={month} label="분류" onChange={handleMonth}>
              {months.map((row, i) => (
                <MenuItem key={i} value={row}>
                  {row}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}></Grid>
      </Grid>
      <Calendar yearMonth={year + month} onOpen={handleOpen} />
      <TodoDialog
        open={open}
        todoId={todoId}
        onClose={handleClose}
      ></TodoDialog>
    </>
  );
}

export { CalendarPage as default };