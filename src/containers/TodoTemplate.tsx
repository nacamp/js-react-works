import React, { useState, useRef, useEffect } from 'react';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import copy from 'copy-to-clipboard';
import { useRecoilValue } from 'recoil';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { AlertColor } from '@mui/material/Alert';
import { useNavigate } from 'react-router';

import { labelListState, useGetLabel } from '../hooks/api';
import { Fallback, Toast } from '../components/Feedback';

import { ITodo } from '../components/Todo';
import { TodoCreate } from '../components/Todo/TodoCreate';
import { TodoList } from '../components/Todo/TodoList';

interface ITodoTitle {
  id: number;
}
function TodoTitle(props: ITodoTitle) {
  return <Typography variant="h5">{dayjs(String(props.id)).format('YYYY년 MM월 DD일')}</Typography>;
}

interface ITodoTemplate {
  children?: React.ReactNode;
  id: number | string;
  name?: string;
  onGet: (id: any) => any; //{isLoading:any, data:any, isSuccess:any, isError:any, refetch:any, error:any} ;
  onPut: (id: any, payload: any) => { isLoading: any; data: any; isSuccess: any; isError: any; mutate: any };
  onPost: (payload: any) => { isLoading: any; data: any; isSuccess: any; isError: any; mutate: any };
  routineLabel?: string;
}

interface IToast {
  open: boolean;
  severity: AlertColor;
  message: string;
}

function TodoTemplate(props: ITodoTemplate) {
  const navigate = useNavigate();
  // //초기설정, 이게없으면 리로드시 라벨이 없다.
  const _ = useGetLabel(0);
  const nextId = useRef<number>(0);
  const [todoList, setTodoList] = useState<Array<ITodo>>([]);
  const [reload, toggleReload] = useState(true);
  const [todoId, setTodoId] = useState(props.id);
  const [privateTodo, setPrivateTodo] = useState(false);
  useEffect(() => {
    setTodoId(props.id);
  }, [props.id]);
  const [fallback, setFallback] = useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState<IToast>({
    open: false,
    severity: 'error',
    message: '에러발생',
  });
  const [childText, setChildText] = useState<string>('');
  const {
    isLoading: isLoadingInGet,
    data: dataInGet,
    isSuccess: isSuccessInGet,
    isError: isErrorInGet,
    refetch: refetchInGet,
    error: errorInGet,
  } = props.onGet(todoId);
  const { isLoading: isLoadingInPut, data: dataInPut, mutate: mutateInPut } = props.onPut(todoId, { data: todoList });
  const {
    isLoading: isLoadingInPost,
    data: dataInPost,
    isSuccess: isSuccessInPost,
    mutate: mutateInPost,
  } = props.onPost({ id: todoId, data: todoList });

  function handleTodoCreate(todo: ITodo) {
    todo.id = nextId.current;
    nextId.current++;
    setTodoList([todo, ...todoList]);
  }

  function handleChildText(text: string) {
    setChildText(text);
  }

  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    setOpenToast({ ...openToast, open: false });
  }

  function handleSave(event: React.MouseEvent<HTMLElement>, text: string) {
    setFallback(true);
    if (childText !== '') {
      setOpenToast({
        ...openToast,
        open: true,
        severity: 'warning',
        message: '저장이 안된 todo 항목이 있습니다.',
      });
    }
    if (dataInGet.id !== undefined) {
      mutateInPut();
    } else {
      mutateInPost();
    }
  }

  function handleReload(event: React.MouseEvent<HTMLElement>, text: string) {
    setFallback(true);
    // queryClient.invalidateQueries('getTodo');
    refetchInGet();
    // 리로드인경우 responseGetTodo에서 가저욘자료가 바꾸지 않아서 render가 안됨, 그래서 toggle처리
    toggleReload(!reload);
  }

  function handleCopy(event: React.MouseEvent<HTMLElement>, text: string) {
    const x = todoList.reduce(function (a, b) {
      return a + ['', '\r'][+!!a.length] + b.text;
    }, '');
    copy(x);
  }
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateTodo(event.target.checked);
  };

  useEffect(() => {
    setFallback(true);
    if (isSuccessInGet) {
      if (dataInGet.data !== undefined && dataInGet.data.length > 0) {
        nextId.current = 1 + Math.max(...dataInGet.data.map((o: ITodo) => o.id));
        setTodoList(dataInGet.data);
      } else {
        nextId.current = 1;
        setTodoList([]);
        // nextId.current = 1 + Math.max(...responseGet.data.data.map((o: ITodo) => o.id));
        // setTodoList(responseGet.data.data);
      }
    }
    if (!isLoadingInGet) {
      setFallback(false);
    }
  }, [dataInGet, isLoadingInGet, isSuccessInGet, reload]);

  useEffect(() => {
    if (isErrorInGet) {
      setFallback(false);
      // setOpenToast({ ...openToast, open: true });
      setOpenToast((prevState) => ({ ...prevState, open: true }));
      if (errorInGet?.message.includes('Token was not found')) {
        navigate('/login');
      }
    }
  }, [isErrorInGet, errorInGet, navigate]);

  useEffect(() => {
    if (isLoadingInPut) {
      setFallback(true);
    } else {
      setFallback(false);
      // console.log(mutaionPut.data)
      // queryClient.invalidateQueries('getRoutine');
      // queryClient.invalidateQueries('getTodo');
    }
  }, [dataInPut, isLoadingInPut]);

  useEffect(() => {
    if (isLoadingInPost) {
      setFallback(true);
    } else {
      setFallback(false);
      // console.log(mutaionPost.data)
      // queryClient.invalidateQueries('getRoutine');
      // queryClient.invalidateQueries('getTodo');
    }
    if (isSuccessInPost){
      refetchInGet();
    }
  }, [dataInPost, isLoadingInPost, isSuccessInPost, refetchInGet]);

  const checkedStyle = {
    color: 'grey',
    textDecorationLine: 'line-through',
  };

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          {props.children}
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" justifyContent="flex-end">
            <FormControlLabel control={<Switch onChange={handleChecked} />} label="private" />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="outlined" onClick={(e) => handleCopy(e, 'clicked')}>
              copy
            </Button>
          </Box>
        </Grid>
      </Grid>
      <TodoList todoList={todoList} setTodoList={setTodoList} privateTodo={privateTodo}></TodoList>
      <TodoCreate
        onTodoCreate={handleTodoCreate}
        onChange={handleChildText}
        routineLabel={props.routineLabel}
        labelList={useRecoilValue(labelListState)}
      />
      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={(e) => handleSave(e, 'clicked')}>
              save
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-start">
            <Button variant="outlined" onClick={(e) => handleReload(e, 'clicked')}>
              reload
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Fallback open={fallback} />
      <Toast open={openToast.open} severity={openToast.severity} message={openToast.message} onClose={handleClose} />
    </>
  );
}

export { TodoTemplate, TodoTitle };
