import React, { useState, useRef, useEffect } from 'react';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';

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
    date: string;
    thisMonth: boolean;
    onOpen: (text: number) => void;
}
function BoxButton({ date, thisMonth, onOpen }: IBoxButton) {
    function handleOpen(event: React.MouseEvent<HTMLElement>, text: string) {
        console.log(text);
        const id: number = +text;
        onOpen(id);
    }

    return (
        <Button sx={{ pb: 8, textAlign: "left", color: 'black', width: 2 / 2, height: 2 / 2, display: "block", bgcolor: thisMonth ? grey[50] : grey[300] }} onClick={(e) => handleOpen(e, date)} variant="text" >
            <Typography sx={{  color: dayjs().format('YYYYMMDD') === date ? 'red':'black'}} variant="body2"> {date.substring(6)} </Typography>
        </Button>
    )

}

interface IFormRow {
    dates: Array<Array<[string, number]>>
    onOpen: (text: number) => void;
}
function FormRow({ dates, onOpen }: IFormRow) {
    function handleOpen(id: number) {
        onOpen(id);
    }

    return (
        <>
            {dates.map((row: any) => (
                <Grid key={row} item xs={12 / 7} style={{ border: "1px dotted grey" }} >
                    <BoxButton date={row[0]} thisMonth={row[1]} onOpen={handleOpen} />
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
        [dayjs(date).add(-(row + 1), 'day').format('YYYYMMDD'), false]
    ));
    array7x6.push(...prevMonth.reverse());

    // 이번달
    const month = dayjs(date).month();
    for (let i = 0; i < 31; i++) {
        const d = dayjs(date).add(i, 'day');
        if (d.month() !== month) {
            break;
        }
        array7x6.push([d.format('YYYYMMDD'), true]);
    }

    // 다음달
    const nextMonth = dayjs(date).add(1, 'month');
    const currentLength = array7x6.length;
    for (let i = 0; i < 7 * 6 - currentLength; i++) {
        const d = dayjs(nextMonth).add(i, 'day');
        array7x6.push([d.format('YYYYMMDD'),false]);
    }
    return array7x6;
}

interface ICalendar {
    yearMonth: string
}
export function Calendar({ yearMonth }: ICalendar) {
    const [days7x6, setDays7x6] = useState<Array<any>>([]);
    const [open, setOpen] = useState(false);
    const [todoId, setTodoId] = useState(0);
    const weekSize = 7;
    const weekNames = ['일', '월', '화', '수', '목', '금', '토'];
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
                <Grid container spacing={0}>
                    <Grid key={-1} container item  >
                        {weekNames.map((row: any, i) => (
                            <Grid key={i} item xs={12 / 7}   >
                                <Typography variant="h6" align='center' >
                                    {row}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                    {days7x6.map((row, i) => (
                        <Grid key={i} container item >
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

    return ( //sx={{ bgcolor: 'white' }}
        <Dialog onClose={handleClose} open={open} fullScreen >
            <AppBar sx={{ position: 'relative' }} >
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
                <TodoTemplate id={todoId} onGet={useGetTodo} onPut={usePutTodo} onPost={usePostTodo} > <TodoTitle id={todoId} /></TodoTemplate>
            </Box>
        </Dialog>
    );

}

export {
    CalendarPage as default
}