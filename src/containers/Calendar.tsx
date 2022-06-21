import React, { useState, useRef, useEffect } from 'react';
import { TextField, InputAdornment } from "@mui/material";

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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
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
{/* <React.Fragment>
        <Grid item xs={12/7}>
          <BoxButton/>
        </Grid>
        <Grid item xs={12/7}>
        <BoxButton/>
        </Grid>
        <Grid item xs={12/7}>
        <BoxButton/>
        </Grid>
        <Grid item xs={12/7}>
        <BoxButton/>
        </Grid>
        <Grid item xs={12/7}>
        <BoxButton/>
        </Grid>
        <Grid item xs={12/7}>
        <BoxButton/>
        </Grid>
        <Grid item xs={12/7}>
        <BoxButton/>
        </Grid>
      </React.Fragment> */}
{/* ); */ }
{/* } */ }


//  const todoList =[];
//  const tt = todoList.map((row) => (

// ));
// function fillDay(yearMonth:string){
//     const array7x6=[];
//     const weekDay =  dayjs(yearMonth+'01').day();
//     const prevMonth =  dayjs(yearMonth+'01').add(-1, 'month').day();
//     console.log(weekDay);
//     console.log(prevMonth);
//     console.log(dayjs('20220601').add(-1, 'day').format('YYYYMMDD'));
//     let range = (n:any) => Array.from(Array(n).keys());
//     if(!!weekDay){
//         console.log(range(weekDay));
//         const prevMonth = range(weekDay).map((row) => (
//             dayjs(yearMonth+'01').add(-row, 'day').format('YYYYMMDD')
//         ));
//         array7x6.push(...prevMonth.reverse());
//         // console.log(array7x6.reverse());
//     }
//     const month =  dayjs(yearMonth+'01').month();
//     for (let i = 0; i < 31; i++) {
//         const d =  dayjs(yearMonth+'01').add(i, 'day');
//         if( d.month() !== month){
//             break;
//         }
//         array7x6.push(d.format('YYYYMMDD'));
//         // console.log(d.month(), d.format('YYYYMMDD'));
//     }

//     const nextMonth =  dayjs(yearMonth+'01').add(1, 'month');
//     const l = array7x6.length;
//     for (let i =0 ; i < 42-l; i++) {
//         console.log(i);
//         const d =  dayjs(nextMonth).add(i, 'day');
//         array7x6.push(d.format('YYYYMMDD'));
//         console.log(d.month(), d.format('YYYYMMDD'));
//     }
//     console.log( array7x6.length , array7x6)
// }


function fillDay(date: string) {
    const array7x6 = [];
    const weekDay = dayjs(date).day();
    // const prevMonth =  dayjs(yearMonth+'01').add(-1, 'month').day();
    // console.log(weekDay);
    // console.log(prevMonth);
    // console.log(dayjs('20220601').add(-1, 'day').format('YYYYMMDD'));
    // 전달
    let range = (n: any) => Array.from(Array(n).keys());
    // console.log(range(weekDay));
    // console.log(' range(weekDay):', range(weekDay));
    const prevMonth = range(weekDay).map((row) => (
        dayjs(date).add(-(row + 1), 'day').format('YYYYMMDD')
    ));
    array7x6.push(...prevMonth.reverse());
    // console.log(array7x6);
    // 이번달
    const month = dayjs(date).month();
    for (let i = 0; i < 31; i++) {
        const d = dayjs(date).add(i, 'day');
        if (d.month() !== month) {
            break;
        }
        array7x6.push(d.format('YYYYMMDD'));
        // console.log(d.month(), d.format('YYYYMMDD'));
    }

    // 다음달
    const nextMonth = dayjs(date).add(1, 'month');
    const currentLength = array7x6.length;
    for (let i = 0; i < 42 - currentLength; i++) {
        // console.log(i);
        const d = dayjs(nextMonth).add(i, 'day');
        array7x6.push(d.format('YYYYMMDD'));
        // console.log(d.month(), d.format('YYYYMMDD'));
    }
    // console.log('fillday', array7x6.length, array7x6)
    return array7x6;
}

interface ICalendar {
    yearMonth: string
}
function Calendar({ yearMonth }: ICalendar) {
    // const [days, setDays] = useState<Array<string>>([]);
    const [days7x6, setDays7x6] = useState<Array<any>>([]);
    const [open, setOpen] = useState(false);
    const [todoId, setTodoId] = useState(0);
    const chunkSize = 7;
    // fill();
    useEffect(() => {
        console.log(yearMonth);
        fill();
    }, [yearMonth])
    function handleClose() {
        setOpen(false);
    }
    function handleOpen(id: number) {
        setOpen(true);
        setTodoId(id);
    }

    function fill() {
        // // console.log('Calendar',yearMonth);
        const days = fillDay(yearMonth + '01');
        // // console.log('x', [...x]);
        // setDays([...r]);
        // // console.log(days);
        const s7x6 = [];
        for (let i = 0; i < days?.length; i += chunkSize) {
            const chunk = days.slice(i, i + chunkSize);
            s7x6.push(chunk);
        }
        setDays7x6(s7x6);
        // console.log(days7x6);
    }


    // let todoList = new Array(7 * 6).fill(1).map((arr, i) => {  // (arr: 현재값, i:인덱스)
    //     return { 'id': i }
    // });
    // 
    // const todoList7x5 = [];
    // for (let i = 0; i < todoList.length; i += chunkSize) {
    //     const chunk = todoList.slice(i, i + chunkSize);
    //     todoList7x5.push(chunk);
    // }

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

    // let todoList = new Array(7 * 6).fill(1).map((arr, i) => {  // (arr: 현재값, i:인덱스)
    //     return { 'id': i }
    // });
    // const chunkSize = 7;
    // const todoList7x6 = [];
    // for (let i = 0; i < todoList.length; i += chunkSize) {
    //     const chunk = todoList.slice(i, i + chunkSize);
    //     todoList7x6.push(chunk);
    // }
    // const { id } = useParams();
    // const nid = !!id ? Number(id) : Number(dayjs(new Date()).format('YYYYMMDD'));
    // const todoList = [ {id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}  ]
    return (
        <Calendar yearMonth='202206' />
    );
}

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
    return (
        <Dialog onClose={handleClose} open={open} fullScreen >

            <AppBar sx={{ position: 'relative' }}>
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
                        Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <TodoTemplate id={todoId} onGet={useGetTodo} onPut={usePutTodo} onPost={usePostTodo} > <TodoTitle id={todoId} /></TodoTemplate>


        </Dialog>

    );

}



export {
    CalendarPage as default
}

