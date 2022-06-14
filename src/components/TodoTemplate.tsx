import React, { useState, useRef } from 'react';
import { TextField, InputAdornment } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true,
        label: '오늘',
    },
];
interface ITodo {
    id: number, // Number error
    text: String,
    done: boolean,
    label: String
}

type ITodoCreate = {
    onTodoCreate: (todo: ITodo) => void;
}

function TodoCreate({ onTodoCreate }: ITodoCreate) {
    const [text, setText] = useState('');
    const [label, setLabel] = React.useState('오늘');

    function handleAdd(event: any) {
        if (text.trim() === '') {
            console.log('node data...');
            return;
        }
        console.log(text);
        const data = {
            id: 0,
            text,
            done: false,
            label,
        }
        onTodoCreate(data);
        setText('');
    }

    const handleLabel = (event: any) => {
        console.log(event.target.value);
        setLabel(event.target.value as string);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Select
                        value={label}
                        label="분류"
                        onChange={handleLabel}
                    >
                        <MenuItem value={'오늘'}>오늘</MenuItem>
                        <MenuItem value={'주'}>주</MenuItem>
                        <MenuItem value={'달'}>달</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={9}>
                    <TextField fullWidth label="할일" value={text} variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setText(event.target.value);
                    }} required />
                </Grid>
                <Grid item xs={1} style={{ display: "flex", alignItems: "right" }} >
                    <IconButton size='small' onClick={handleAdd}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

interface ITodoTemplate {
    children?: React.ReactNode;
}

function TodoTemplate(props: ITodoTemplate) {
    const nextId = useRef<number>(2);
    const [todoList, setTodoList] = useState<Array<ITodo>>(initialTodos);

    function handleDoneClick(event: React.ChangeEvent<HTMLInputElement>, id: Number) {
        console.log('checked: ', id, event.target.checked);
        const newTodoList = todoList.map<ITodo>((todo) =>
            todo.id === id ? { ...todo, done: event.target.checked } : todo
        );
        // console.log(newTodoList);
        setTodoList(newTodoList);
    }

    function handleDelete(id: Number) {
        setTodoList(todoList.filter((value, index) => value.id !== id));
    }

    function handleTodoCreate(todo: ITodo) {
        todo.id = nextId.current;
        nextId.current++;
        setTodoList([todo, ...todoList]);
    }

    return (
        <>
            {props.children}
            <Table size="small">
                <TableBody>
                    {todoList.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell><FormControlLabel value={row.id} control={<Checkbox onClick={(e: any) => handleDoneClick(e, row.id)} />} label={row.text} /> <Chip label={row.label} />  </TableCell>
                            <TableCell align="right" >
                                <IconButton value={row.id} size='small' onClick={() => handleDelete(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TodoCreate onTodoCreate={handleTodoCreate} />
        </>
    )
}

export default TodoTemplate;