import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import "dayjs/locale/ko";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import Chip from "@mui/material/Chip";
import { ITodo } from ".";

interface ITodoList {
  // id: number | string;
  name?: string;
  // onGet: (id: any) => void;
  // onPut: (id: any, payload: any) => void;
  // onPost: (payload: any) => void;
  routineLabel?: string;
  privateTodo: boolean;
  todoList:Array<ITodo>;
  //setTodoList:(payload: Array<ITodo>)=> void; // Dispatch<SetStateAction<ITodo[]>>
  setTodoList: Dispatch<SetStateAction<ITodo[]>>
}


function TodoList({routineLabel, todoList, privateTodo, setTodoList}: ITodoList) {
  //const [todoList, setTodoList] = useState<Array<ITodo>>(props.todoList);
  const [editId, setEditId] = useState<number>(-1);
  const [editText, setEditText] = useState("");
  // const [privateTodo, setPrivateTodo] = useState(false);
  const [childText, setChildText] = useState<string>("");
  // const responseGet: any = props?.onGet(todoId);
  // const mutaionPut: any = props?.onPut(todoId, { data: todoList });
  // const mutaionPost: any = props?.onPost({ id: todoId, data: todoList });

  // useEffect(() => {
  //   setTodoList(props.todoList);
  // }, [props.todoList])


  function handleDoneClick(
    event: React.ChangeEvent<HTMLInputElement>,
    id: Number
  ) {
    // console.log('checked: ', id, event.target.checked);
    const newTodoList = todoList.map<ITodo>((todo) =>
      todo.id === id ? { ...todo, done: event.target.checked } : todo
    );
    setTodoList(newTodoList);
  }

  function handleDelete(id: Number) {
    setTodoList(todoList.filter((value, index) => value.id !== id));
  }
  function handleEditShow(id: number, text: string) {
    console.log("handleEditShow", id);
    setEditId(id);
    setEditText(text);
  }
  function handleEditSave(id: number) { 
    setTodoList((prevState:ITodo[]):ITodo[] => {
      const newState = prevState.map((obj) => {
        if (obj.id === id) {
          return { ...obj, text: editText };
        }
        return obj;
      });

      return newState;
    });
    setEditId(-1);
  }
  function handleEditCancel(id: number) {
    console.log(id);
    setEditId(-1);
  }

  const isPrivate = (label: string) => {
    if (!privateTodo) {
      return false;
    }
    if (["회사", "오늘", "매주"].includes(label)) {
      return false;
    }
    return true;
    // console.log(label, x);
    // return x;
    // if( label in // setPrivateTodo(event.target.checked);
    //setChecked(event.target.checked);
  };


  const checkedStyle = {
    color: "grey",
    textDecorationLine: "line-through",
  };

  return (
    <Table size="small">
      <TableBody>
        {todoList.map((row) => (
          <TableRow
            key={row.id}
            sx={isPrivate(row.label) ? { display: "none" } : {}}
          >
            <TableCell>
              {!!routineLabel && editId !== row.id && (
                <span>{row.text}</span>
              )}
              {!routineLabel && editId !== row.id && (
                <>
                  <FormControlLabel
                    style={!!row.done ? checkedStyle : {}}
                    value={row.id}
                    control={
                      <Checkbox
                        onClick={(e: any) => handleDoneClick(e, row.id)}
                      />
                    }
                    checked={row.done}
                    label={row.text}
                  />
                  {row.label !== "오늘" && <Chip label={row.label} />}
                </>
              )}
              {editId === row.id && (
                <>
                  <TextField
                    fullWidth
                    label="할일"
                    value={editText}
                    variant="standard"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setEditText(event.target.value);
                    }}
                    required
                  />
                </>
              )}
            </TableCell>

            {editId !== row.id && (
              <>
                <TableCell align="right">
                  <IconButton
                    value={row.id}
                    size="small"
                    onClick={() => handleEditShow(row.id, row.text)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    value={row.id}
                    size="small"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </>
            )}
            {editId === row.id && (
              <>
                <TableCell align="right">
                  <IconButton
                    value={row.id}
                    size="small"
                    onClick={() => handleEditSave(row.id)}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    value={row.id}
                    size="small"
                    onClick={() => handleEditCancel(row.id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { TodoList };
