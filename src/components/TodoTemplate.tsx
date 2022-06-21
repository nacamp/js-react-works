import React, { useState, useRef, useEffect } from 'react';
import { TextField, InputAdornment } from "@mui/material";
import IconButton from '@mui/material/IconButton';
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

// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import { queryByPlaceholderText } from '@testing-library/react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    QueryCache,
} from 'react-query'
import { useGetTodo, usePutTodo, usePostTodo, useGetRoutine, usePutRoutine, usePostRoutine } from '../hooks/api';

// import Fallback from '../components/Fallback';
import { Fallback, Toast } from '../components/Feedback';
import { OfflinePin } from '@mui/icons-material';

interface ITodo {
    id: number, // Number error
    text: String,
    done: boolean,
    label: String
}

type ITodoCreate = {
    onTodoCreate: (todo: ITodo) => void;
    onChange: (text:string) => void;
    // showLabel?: boolean;
    // defaultLabel?: string;
    routineLabel?: string;
}

// TODO: 항목이 하나도 없이 저장시 key에러가 난다. 나중에 수정필요
function TodoCreate({ onTodoCreate, onChange, routineLabel }: ITodoCreate) {
    const [text, setText] = useState('');
    const [label, setLabel] = React.useState(!!routineLabel ? routineLabel : '오늘');

    function handleAdd(event: any) {
        if (text.trim() === '') {
            console.log('node data...');
            return;
        }
        const data = {
            id: 0,
            text,
            done: false,
            label,
        }
        onTodoCreate(data);
        setText('');
        onChange('');
    }

    const handleLabel = (event: any) => {
        console.log(event.target.value);
        setLabel(event.target.value as string);
    };

    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={2}>
                    {!routineLabel &&
                        <FormControl variant="standard" sx={{ m: 1, mt: 2, minWidth: 100 }}>
                            <Select
                                value={label}
                                label="분류"
                                onChange={handleLabel}
                            >
                                <MenuItem value={'오늘'}>오늘</MenuItem>
                                <MenuItem value={'매주'}>매주</MenuItem>
                                <MenuItem value={'매달'}>매달</MenuItem>
                            </Select>
                        </FormControl>
                    }
                    {!!routineLabel &&
                        <span>{routineLabel}</span>
                    }
                </Grid>


                <Grid item xs={9}>
                    <TextField fullWidth label="할일" value={text} variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setText(event.target.value);
                        onChange(event.target.value);
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

interface ITodoTitle {
    id: number;
}
function TodoTitle(props: ITodoTitle) {
    return (
        <Typography variant='h5'>
            {dayjs(String(props.id)).format('YYYY년 MM월 DD일')}
        </Typography>
    );
};

interface ITodoTemplate {
    children?: React.ReactNode;
    id: number | string;
    name?: string;
    onGet: (id: any) => void;
    onPut: (id: any, payload: any) => void;
    onPost: (payload: any) => void;
    routineLabel?: string
}

interface IToast{
    open: boolean;
    severity: AlertColor;
    message: string;
}

function TodoTemplate(props: ITodoTemplate) {
    const nextId = useRef<number>(0);
    const [todoList, setTodoList] = useState<Array<ITodo>>([]);
    const [reload, toggleReload] = useState(true);
    const [todoId, setTodoId] = useState(props.id);
    useEffect(() => {
        setTodoId(props.id)
    }, [props.id])
    const [fallback, setFallback] = useState<boolean>(false);
    const [openToast, setOpenToast] = React.useState<IToast>({open:false, severity:'error', message:'에러발생' });
    const [childText, setChildText] = useState<string>('');
    const queryClient = useQueryClient();
    const responseGet: any = props?.onGet(todoId);
    const mutaionPut: any = props?.onPut(todoId, { data: todoList });
    const mutaionPost: any = props?.onPost({ id: todoId, data: todoList });

    function handleDoneClick(event: React.ChangeEvent<HTMLInputElement>, id: Number) {
        // console.log('checked: ', id, event.target.checked);
        const newTodoList = todoList.map<ITodo>((todo) =>
            todo.id === id ? { ...todo, done: event.target.checked } : todo
        );
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

    function handleChildText(text: string) {
        setChildText(text);
    }

    function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
        setOpenToast({...openToast, open:false});
    }

    function handleSave(event: React.MouseEvent<HTMLElement>, text: string) {
        setFallback(true);
        if(childText !==''){
            setOpenToast({...openToast, open:true, severity:'warning', message:'저장이 안된 todo 항목이 있습니다.' });
        }
        if (responseGet.data.id !== undefined) {
            mutaionPut.mutate({ data: todoList });
        } else {
            mutaionPost.mutate({ id: todoId, data: todoList });
        }

    }

    function handleReload(event: React.MouseEvent<HTMLElement>, text: string) {
        setFallback(true);
        // queryClient.invalidateQueries('getTodo');
        responseGet.refetch();
        // 리로드인경우 responseGetTodo에서 가저욘자료가 바꾸지 않아서 render가 안됨, 그래서 toggle처리
        toggleReload(!reload);
    }

    function handleCopy(event: React.MouseEvent<HTMLElement>, text: string) {
        const x = todoList.reduce(function (a, b) { return a + ["", "\r"][+!!a.length] + b.text; }, "");
        copy(x);
        // // todoList.map()
        // const x = todoList.reduce(function(a, b) {return a + ["", "\r"][+!!a.length] + b.text;}, "");
        // // todoList.forEach(e => console.log(e.text));
        // // console.log(JSON.stringify(todoList));
        // // console.log(todoList);
        // console.log(x);
    }


    useEffect(() => {
        setFallback(true);
        if (responseGet.isSuccess) {
            if (responseGet.data.data !== undefined && responseGet.data.data.length > 0) {
                nextId.current = 1 + Math.max(...responseGet.data.data.map((o: ITodo) => o.id));
                setTodoList(responseGet.data.data);
            } else {
                nextId.current = 1;
                setTodoList([]);
                // nextId.current = 1 + Math.max(...responseGet.data.data.map((o: ITodo) => o.id));
                // setTodoList(responseGet.data.data);
            }
        }
        if (!responseGet.isLoading) {
            setFallback(false);
        }
    }, [responseGet.data, responseGet.isLoading, reload])


    // useEffect(() => {
    //     setFallback(true);
    //     if (responseGet.isSuccess) {
    //         if (responseGet.data.id !== undefined) {
    //             nextId.current = 1 + Math.max(...responseGet.data.data.map((o: ITodo) => o.id));
    //             setTodoList(responseGet.data.data);
    //         } else {
    //             // nextId.current = 1;
    //             // setTodoList([]);
    //             nextId.current = 1 + Math.max(...responseGet.data.data.map((o: ITodo) => o.id));
    //             setTodoList(responseGet.data.data);
    //         }
    //     }
    //     if (!responseGet.isLoading) {
    //         setFallback(false);
    //     }
    // }, [responseGet.data, responseGet.isLoading, reload])

    useEffect(() => {
        if (responseGet.isError) {
            setFallback(false);
            setOpenToast({...openToast, open:true});
        }
    }, [responseGet.isError])

    useEffect(() => {
        if (mutaionPut.isLoading) {
            setFallback(true);
        } else {
            setFallback(false);
            // console.log(mutaionPut.data)
            // queryClient.invalidateQueries('getRoutine');
            // queryClient.invalidateQueries('getTodo');
        }
    }, [mutaionPut.data])

    useEffect(() => {
        if (mutaionPost.isLoading) {
            setFallback(true);
        } else {
            setFallback(false);
            // console.log(mutaionPost.data)
            // queryClient.invalidateQueries('getRoutine');
            // queryClient.invalidateQueries('getTodo');
        }
    }, [mutaionPost.data])

    const checkedStyle = {
        color: 'grey',
        textDecorationLine: 'line-through'
    }

    return (

        <>
            <Grid container>
                <Grid item xs={10}>
                    {props.children}
                </Grid>
                <Grid item xs={2} >
                    <Box display="flex" justifyContent="flex-end">
                        <Button size='small' variant="outlined" onClick={(e) => handleCopy(e, "clicked")}>copy</Button>
                    </Box>
                </Grid>
            </Grid>
            <Table size="small">
                <TableBody>
                    {todoList.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {!!props.routineLabel &&
                                    <span>{row.text}</span>
                                }
                                {!props.routineLabel &&
                                    <>
                                        <FormControlLabel style={!!row.done ? checkedStyle : {}} value={row.id} control={<Checkbox onClick={(e: any) => handleDoneClick(e, row.id)} />} checked={row.done} label={row.text} />
                                        <Chip label={row.label} />
                                    </>
                                }
                            </TableCell>
                            <TableCell align="right" >
                                <IconButton value={row.id} size='small' onClick={() => handleDelete(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TodoCreate onTodoCreate={handleTodoCreate}  onChange={handleChildText} routineLabel={props.routineLabel} />
            <Grid container spacing={2} sx={{ mt: 0.5 }} >
                <Grid item xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="outlined" onClick={(e) => handleSave(e, "clicked")}>save</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <Box display="flex" justifyContent="flex-start">
                        <Button variant="outlined" onClick={(e) => handleReload(e, "clicked")}>reload</Button>
                    </Box>
                </Grid>
            </Grid>
            <Fallback open={fallback} />
            <Toast open={openToast.open} severity={openToast.severity} message={openToast.message} onClose={handleClose} />
        </>
    )
}

// interface IDefaultTodoTemplate {
//     id?: number;
// }

function TodoTemplatePage() {
    const { id } = useParams();
    const nid = !!id ? Number(id) : Number(dayjs(new Date()).format('YYYYMMDD'));
    return (
        <TodoTemplate id={nid} onGet={useGetTodo} onPut={usePutTodo} onPost={usePostTodo} > <TodoTitle id={nid} /></TodoTemplate>
    )
}

export {
   TodoTitle, TodoTemplate, TodoTemplatePage as default
}

