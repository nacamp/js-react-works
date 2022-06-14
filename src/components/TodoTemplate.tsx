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
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Generate Order Data
function createData(
    id: number,
    name: string,
) {
    return { id, name };
}

const rows = [
    createData(
        0,
        'Elvis Presley',
    ),
    createData(
        1,
        'London, UK',
    ),
];



// import styled from 'styled-components';

// const TodoTemplateBlock = styled.div`
//   width: 512px;
//   height: 768px;

//   position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
//   background: white;
//   border-radius: 16px;
//   box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

//   margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

//   margin-top: 96px;
//   margin-bottom: 32px;
//   display: flex;
//   flex-direction: column;
// `;


const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true,
        label: '오늘',
    },
];

interface ITodoTemplate {
    children?: React.ReactNode;
}
interface ITodo {
    id: number, // Number error
    text: String,
    done: boolean,
    label: String
}

// function TodoList() {
//     const nextId = useRef<number>(2);
//     function handleChange3(event: any) {
//         console.log('delete')
//     }
//     function handleChange2(event: any) {
//         console.log(nextId.current);
//         const data = {
//             id: nextId.current,
//             name: todo,
//         }
//         nextId.current++;
//         setInputs([data, ...inputs]);
//         setTodo('');
//     }
//     const [inputs, setInputs] = useState(initialTodos);
//     const [todo, setTodo] = useState('');

//     function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//         // console.log(event.target.value);
//     }

//     return (
//         <TableRow key={null}>
//             <TableCell><FormControlLabel value="female" control={<Radio />} label="Female" /></TableCell>
//             <TableCell>{null}</TableCell>
//             <TableCell>{null}</TableCell>
//         </TableRow>
//     );
// }

// type ITodoCreate = {
//     message: string;
//     count: number;
//     disabled: boolean;
//     /** array of a type! */
//     names: string[];
//     /** string literals to specify exact string values, with a union type to join them together */
//     status: "waiting" | "success";
//     /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
//     obj: object;
//     obj2: {}; // almost the same as `object`, exactly the same as `Object`
//     /** an object with any number of properties (PREFERRED) */
//     obj3: {
//       id: string;
//       title: string;
//     };
//     /** array of objects! (common) */
//     objArr: {
//       id: string;
//       title: string;
//     }[];
//     /** a dict object with any number of properties of the same type */
//     dict1: {
//       [key: string]: MyTypeHere;
//     };
//     dict2: Record<string, MyTypeHere>; // equivalent to dict1
//     /** any function as long as you don't invoke it (not recommended) */
//     onSomething: Function;
//     /** function that doesn't take or return anything (VERY COMMON) */
//     onClick: () => void;
//     /** function with named prop (VERY COMMON) */
//     onChange: (id: number) => void;
//     /** function type syntax that takes an event (VERY COMMON) */
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     /** alternative function type syntax that takes an event (VERY COMMON) */
//     onClick(event: React.MouseEvent<HTMLButtonElement>): void;
//     /** an optional prop (VERY COMMON!) */
//     optional?: OptionalType;
//   };

type ITodoCreate = {
    onChange: (todo: ITodo) => void;
}

function TodoCreate({onChange}:ITodoCreate) {
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
        onChange(data);
        setText('');
    }

    const handleLabel= (event: any) => {
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

function TodoTemplate(props: ITodoTemplate) {
    const nextId = useRef<number>(2);

    function handleChange4(event: any, check: Number) {
        console.log('checked: ', check, event.target.checked);
        const newInputs = inputs.map<ITodo>((todo) =>
            todo.id === 1 ? { ...todo, done: event.target.checked } : todo
        );
        console.log(newInputs);
        setInputs(newInputs);
        //setChecked(event.target.checked);
    }
    function handleChange3(event: Number) {
        setInputs(inputs.filter((value, index) => value.id !== event));
        // console.log(event.target);
        // return state.filter(todo => todo.id !== action.id);
    }
    // function handleChange2(event: any) {
    //     if (todo.trim() === '') {
    //         console.log('node data...');
    //         return;
    //     }
    //     console.log(nextId.current);
    //     const data = {
    //         id: nextId.current,
    //         text: todo,
    //         done: false,
    //         label: label,
    //     }
    //     nextId.current++;
    //     setInputs([data, ...inputs]);
    //     setTodo('');
    // }
    const [inputs, setInputs] = useState<Array<ITodo>>(initialTodos);

    const [deleteTodo, setDeleteTodo] = useState<Number>(0);
    const [checked, setChecked] = React.useState(true);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // console.log(event.target.value);
    }

    function addTodo(todo:ITodo){
        todo.id = nextId.current;
        nextId.current++;
        setInputs([todo, ...inputs]);
    }

    return (
        <>
            {props.children}
            <Table size="small">
                {/* <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead> */}
                <TableBody>
                    {inputs.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell><FormControlLabel value={row.id} control={<Checkbox onClick={(e: any) => handleChange4(e, row.id)} />} label={row.text} /> <Chip label={row.label} />  </TableCell>
                            <TableCell align="right" >
                                <IconButton value={row.id} size='small' onClick={() => handleChange3(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TodoCreate onChange={addTodo}/>
        </>
    )
}

export default TodoTemplate;
/*

            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleChange4}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inputs.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell><FormControlLabel value={row.id} control={<Radio />} label={row.name} /></TableCell>
                                <TableCell>
                                    <IconButton value={row.id} size='small' onClick={handleChange3}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </RadioGroup>

                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AddIcon />
                        </InputAdornment>
                    ),
                }}

function TodoTemplate(props: ITodoTemplate) {
    return (
        <>
            {props.children}
            <TextField label="할일" variant="standard" onChange={handleChange}

                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AddIcon />
                        </InputAdornment>
                    ),
                }}

                required />
            <IconButton size='small' >
                <AddIcon />
            </IconButton>
        </>
    )
}


*/