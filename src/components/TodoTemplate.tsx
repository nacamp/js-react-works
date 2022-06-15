import React, { useState, useRef, useEffect } from 'react';
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
import Button from '@mui/material/Button';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    QueryCache,
  } from 'react-query'
import {useGetTodo, usePutTodo} from '../hooks/api';
import { queryByPlaceholderText } from '@testing-library/react';

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
    console.log('TodoTemplate');
    const nextId = useRef<number>(0);
    const [todoList, setTodoList] = useState<Array<ITodo>>([]);
    const [reload, toggleReload] = useState(true);
    const [todoId, setTodoId] = useState(20220614);
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
    const { data, isSuccess, isLoading, refetch , status}: any = useGetTodo(todoId);
    const  putTodoMutaion : any = usePutTodo(todoId, { data : todoList});
    // const  putTodoMutaion : any = useMutation('putTodo', (data) => putTodo(todoId, data), {
    //     onSuccess: () => {
    //         console.log("putTodo");
    //         console.log(data); // undefined
    //         // setTodoList(data.data);
    //       }
    // });
    const queryClient = useQueryClient();
    // const query = useQuery('todos', getTodo, '20220614');
    // const { data, isSuccess }: any = useQuery(['getTodo', '20220614'] ,getTodo, );
    async function handleSave(event: React.MouseEvent<HTMLElement>, text: string) {
        putTodoMutaion.mutate({ data : todoList});
        // toggleReload(!reload);
        // await putTodo(20220614, {
        //     // id : '20220614',
        //     data : todoList
        // });
        // putTodoMutaion.mutate({ data : todoList});
        // refetch();


        // // const query = queryCache.find('getTodo');
        // // queryCache.clear();

        // queryClient.invalidateQueries('getTodo');
        // // queryClient.invalidateQueries(['getTodo']);
        // // queryClient.invalidateQueries();
        // console.log(11111111);
        //     // const x  = await getTodo(202206145);
        //     // // const url = "http://localhost:3000/todos/20220614";
        //     // // fetch(url,{
        //     // //     headers: {
        //     // //         'Content-Type': 'application/json',
        //     // //         'Origin': 'http://localhost:3000'
        //     // //     }
        //     // // })
        //     // // .then((response) => response.json())
        //     // // .then(console.log);
        //     // console.log(x);
    }

    useEffect(() => {
        if(isSuccess){
            console.log(1111);
            nextId.current = 1 +  Math.max(...data.data.map( (o:ITodo) => o.id));
            console.log('max:', nextId.current );
            setTodoList(data.data);
        }
        console.log(2222);

      }, [ data, reload])


    return (
        <>
        {/* {isSuccess && data.data.map((row:ITodo) => (
            <div>{row.id},{row.text}</div>
        ))} */}
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
            <Button variant="contained" onClick={(e) => handleSave(e, "clicked")}>save</Button>
        </>
    )
}

export default TodoTemplate;