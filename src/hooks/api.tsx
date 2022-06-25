import { areArraysEqual } from '@mui/base';
import {
  useQuery,
  useMutation,
} from 'react-query'
import { getToken, removeToken } from '../components/Token';
import dayjs from 'dayjs';
import { atom, selector, useRecoilState, useSetRecoilState } from 'recoil';
import React, { useState, useRef, useEffect } from 'react';

function makeJwtHeader() {
  const token = getToken();
  if (token) {
    // express
    return { "x-access-token": token };
    // return { "Authorization": `Bearer ${token}` };
  }
  throw new Error('Token was not found')
}

export const getTodo = async (id: any) => {
  const url = "http://localhost:3000/todos/";
  const response = await fetch(`${url}${id}`, {
    method: 'GET',
    headers: {
      ...makeJwtHeader()
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      const r = await getRoutine(dayjs(id + '').day());
      return { data: r.data }
    } else {
      throw new Error('Network response was not ok')
    }
  }
  return response.json();
};

export const useGetTodo = (id: any) => {
  return useQuery(['getTodo', id], async () => await getTodo(id), {
    onSuccess: () => {
      // console.log("Get data!");
      // console.log(data); // undefined
    }
  });
};

export const getRoutine = async (id: any) => {
  const url = "http://localhost:3000/routines/";

  const response = await fetch(`${url}${id}`, {
    method: 'GET',
    headers: {
      ...makeJwtHeader()
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return { data: [] }
    } else {
      throw new Error('Network response was not ok')
    }
  }
  return response.json();
};

export const useGetRoutine = (id: any) => {
  return useQuery(['getRoutine', id], async () => await getRoutine(id), {
    onSuccess: () => {
      // console.log("Get data!");
      // console.log(data); // undefined
    }
  });
};


export const putTodo = async (id: any, payload: any) => {
  const url = "http://localhost:3000/todos/";
  const response = await fetch(`${url}${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json", //필수
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
};

export const usePutTodo = (id: any, payload: any) => {
  return useMutation(['putTodo', id], async () => await putTodo(id, payload));
};


export const putRoutine = async (id: any, payload: any) => {
  const url = "http://localhost:3000/routines/";
  const response = await fetch(`${url}${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json", //필수
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
};

export const usePutRoutine = (id: any, payload: any) => {
  return useMutation(['putRoutine', id], async () => await putRoutine(id, payload));
};


export const postTodo = async (payload: any) => {
  const url = "http://localhost:3000/todos";
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json", //필수
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
};

export const usePostTodo = (payload: any) => {
  return useMutation('postTodo', async () => await postTodo(payload));
};


export const postRoutine = async (payload: any) => {
  const url = "http://localhost:3000/routines";
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json", //필수
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
};

export const usePostRoutine = (payload: any) => {
  return useMutation('postRoutine', async () => await postRoutine(payload));
};


export const labelListState = atom({
  key: 'labelListState',
  default: [{}],
})
export const getLabel = async () => {
  const url = "http://localhost:3000/label";
  const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...makeJwtHeader()
      },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return { data: [] }
    } else {
      throw new Error('Network response was not ok')
    }
  }
  return response.json();
};

export const useGetLabel = (id: any) => {
  const setLabelList = useSetRecoilState(labelListState);
  const r = useQuery(['getLabel', id], async () => await getLabel(), {
    // enabled: false,
    // onError: (error) =>
    //   console.error('xxxxxx'),
    onSuccess: () => {
      // console.log("Get data!");
      // console.log(data); // undefined
    }
  });
  useEffect(() => {
    if (r.isLoading) {
      // console.log('loading...');
    } else if (r.isError) {
      // console.log('error...');
    } else if (r.isSuccess) {
      // console.log('success...');
      const d = r?.data;
      // console.log(d);
      const remainedTodos = d.data.filter((label: any) => !label.done);
      setLabelList([].concat(remainedTodos));
    }
  }, [r.data, r.isError])
  return r;
};

export const putLabel = async (id: any, payload: any) => {
  const url = "http://localhost:3000/label";
  // console.log('putLabel', id, payload);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json", //필수
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
};

export const usePutLabel = (id: any, payload: any) => {
  const r = useMutation(['putLabel', id], async () => await putLabel(id, { id, data: payload?.data }));
  const setLabelList = useSetRecoilState(labelListState);
  useEffect(() => {
    if (r.isLoading) {
      console.log('loading...');
    } else if (r.isSuccess) {
      console.log('success...');
      const d = r?.data;
      const remainedTodos = d.data.filter((label: any) => !label.done);
      setLabelList([].concat(remainedTodos));
    }
  }, [r.data])
  return r;
};



/*
curl -d '{"email": "olivier@mail.com","password": "bestPassw0rd"}'  \
-H "Content-Type: application/json" \
-X POST http://localhost:5000/login
*/
export const signIn = async (payload: any) => {
  const url = "http://localhost:3000/login";
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json", //필수
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  // console.log('res:',await response.json());
  return response.json();
};

export const useSignIn = (payload: any) => {
  // console.log('useSignIn:input:',payload);
  return useMutation('signIn', async () => await signIn(payload));
};