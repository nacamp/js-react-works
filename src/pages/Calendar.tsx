import React, { useState, useEffect } from 'react';
import 'dayjs/locale/ko';
import { AppBar, Grid, FormControl, Select, MenuItem, Typography, Box, Dialog, Toolbar, IconButton, Tab, Tabs } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TodoTemplate, TodoTitle } from '../containers/TodoTemplate';
import { useGetTodo, usePutTodo, usePostTodo, useGetTodoList } from '../hooks/api';
import { Calendar } from '../components/Calendar';
import { TodoReadOnlyList } from '../components/Todo/TodoReadOnlyList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </>
  );
}

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
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Close
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 2 }}>
        <TodoTemplate id={todoId} onGet={useGetTodo} onPut={usePutTodo} onPost={usePostTodo}>
          {' '}
          <TodoTitle id={todoId} />
        </TodoTemplate>
      </Box>
    </Dialog>
  );
}

function CalendarPage({ yearMonth }: { yearMonth: string }) {
  const years = ['2022', '2023', '2024'];
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const [year, setYear] = React.useState(yearMonth.substring(0, 4));
  const [month, setMonth] = React.useState(yearMonth.substring(4, 6));
  const [open, setOpen] = useState(false);
  const [todoId, setTodoId] = useState(0);
  const [tabId, setTabId] = React.useState(0);
  const { data, refetch } = useGetTodoList(`${year}${month}00`, `${year}${month}31`, { enabled: false});
  const [lastCalledTodoMonth, setLastCalledTodoMonth] = React.useState('');

  useEffect(() => {
    if (tabId === 1) {
      if ( year + month !== lastCalledTodoMonth) {
        setLastCalledTodoMonth(year + month);
        refetch();
      }
    }
  }, [year, month, tabId, lastCalledTodoMonth, refetch]);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabId(newValue);
  };
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
      <Tabs sx={{ m: 1 }} value={tabId} onChange={handleTabChange}>
        <Tab label="Calendar" />
        <Tab label="List" />
      </Tabs>
      <TabPanel value={tabId} index={0}>
        <Calendar yearMonth={year + month} onOpen={handleOpen} />
      </TabPanel>
      <TabPanel value={tabId} index={1}>
        {data && <TodoReadOnlyList data={data} onOpen={handleOpen}></TodoReadOnlyList>}
      </TabPanel>
      <TodoDialog open={open} todoId={todoId} onClose={handleClose}></TodoDialog>
    </>
  );
}

export { CalendarPage as default };
