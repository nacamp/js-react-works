import React, { useState, useRef, useEffect } from 'react';
import { TextField, InputAdornment } from "@mui/material";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { AlertColor } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import * as React from 'react';
// import { useState, useRef, useEffect } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodoTemplate, TodoTitle } from '../components/TodoTemplate'
import { useGetTodo, usePutTodo, usePostTodo, useGetRoutine, usePutRoutine, usePostRoutine } from '../hooks/api';
import { range } from '../util';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface IBoxButton {
    date: string,
    onOpen: (text: number) => void;
}
function BoxButton({ date, onOpen }: IBoxButton) {
    function handleOpen(event: React.MouseEvent<HTMLElement>, text: string) {
        console.log(text);
        const id: number = +text;
        onOpen(id);
    }

    return (
        <Button onClick={(e) => handleOpen(e, date)} variant="outlined" style={{ display: "block", textAlign: "left" }}>
            <Typography
                variant="h5"
            >
                Text2
            </Typography>
            <Typography variant="h6"> {date}</Typography>
        </Button>
    )

}

interface IFormRow {
    dates: Array<string>
    onOpen: (text: number) => void;
}
function FormRow({ dates, onOpen }: IFormRow) {
    const todoList = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

    function handleOpen(id: number) {
        onOpen(id);
    }

    return (
        <>
            {dates.map((row: any) => (
                <Grid key={row} item xs={12 / 7}>
                    <BoxButton date={row} onOpen={handleOpen} />
                </Grid>
            ))}
        </>
    );
};


function fillDay(date: string) {
    const array7x6 = [];
    const weekDay = dayjs(date).day();
    // 전달
    const prevMonth = range(weekDay).map((row) => (
        dayjs(date).add(-(row + 1), 'day').format('YYYYMMDD')
    ));
    array7x6.push(...prevMonth.reverse());

    // 이번달
    const month = dayjs(date).month();
    for (let i = 0; i < 31; i++) {
        const d = dayjs(date).add(i, 'day');
        if (d.month() !== month) {
            break;
        }
        array7x6.push(d.format('YYYYMMDD'));
    }

    // 다음달
    const nextMonth = dayjs(date).add(1, 'month');
    const currentLength = array7x6.length;
    for (let i = 0; i < 7 * 6 - currentLength; i++) {
        const d = dayjs(nextMonth).add(i, 'day');
        array7x6.push(d.format('YYYYMMDD'));
    }
    return array7x6;
}

interface ICalendar {
    yearMonth: string
}
function Calendar({ yearMonth }: ICalendar) {
    const [days7x6, setDays7x6] = useState<Array<any>>([]);
    const [open, setOpen] = useState(false);
    const [todoId, setTodoId] = useState(0);
    const weekSize = 7;
    useEffect(() => {
        const days = fillDay(yearMonth + '01');
        const s7x6 = [];
        for (let i = 0; i < days?.length; i += weekSize) {
            const week = days.slice(i, i + weekSize);
            s7x6.push(week);
        }
        setDays7x6(s7x6);
    }, [yearMonth])
    function handleClose() {
        setOpen(false);
    }
    function handleOpen(id: number) {
        setOpen(true);
        setTodoId(id);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {days7x6.map((row, i) => (
                        <Grid key={i} container item spacing={3}>
                            <FormRow dates={row} onOpen={handleOpen} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <TodoDialog open={open} todoId={todoId} onClose={handleClose}></TodoDialog>
        </>
    )
}

function CalendarPage() {
    const years = ["2022", "2023", "2024"];
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const [year, setYear] = React.useState('2022');
    const [month, setMonth] = React.useState('06');

    const handleYear = (event: any) => {
        setYear(event.target.value as string);
    };
    const handleMonth = (event: any) => {
        setMonth(event.target.value as string);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, mt: 2, minWidth: 100 }}>
                        <Select
                            value={year}
                            label="분류"
                            onChange={handleYear}
                        >
                            {years.map((row, i) => (
                                <MenuItem key={i} value={row}>{row}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{ m: 1, mt: 2, minWidth: 100 }}>
                        <Select
                            value={month}
                            label="분류"
                            onChange={handleMonth}
                        >
                            {months.map((row, i) => (
                                <MenuItem key={i} value={row}>{row}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7}>

                </Grid>
            </Grid>
            <Calendar yearMonth={year + month} />
        </>

    );
}


// const drawerWidth: number = 240;
// interface AppBarProps extends MuiAppBarProps {
//     open?: boolean;
//   }

//   const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
//   })<AppBarProps>(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     }),
//   }));

export interface SimpleDialogProps {
    open: boolean;
    todoId: number;
    onClose: () => void;
}

function TodoDialog(props: SimpleDialogProps) {
    // const { onClose, selectedValue, open } = props;
    const { onClose, open, todoId } = props;
    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value: string) => {
        //onClose(value);
    };
    return ( //sx={{ bgcolor: 'white' }}
        <Dialog onClose={handleClose} open={open} fullScreen >
            <AppBar sx={{ position: 'relative', bgcolor: 'white' }}>
                <Toolbar>
                    <IconButton
                        sx={{ color: 'black' }}
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1, color: 'black' }} variant="h6" component="div">
                        Close
                    </Typography>

                </Toolbar>
            </AppBar>
            <Box sx={{m:2}}>
                <TodoTemplate id={todoId} onGet={useGetTodo} onPut={usePutTodo} onPost={usePostTodo} > <TodoTitle id={todoId} /></TodoTemplate>
            </Box>
        </Dialog>

    );

}

export {
    CalendarPage as default
}

