import {
  useQuery,
  useMutation,
} from 'react-query'

export const getTodo = async (id: any) => {
  const url = "http://localhost:3000/todos/";

  const response = await fetch(`${url}${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    if(response.status === 404){
      return {}
    }else{
      throw new Error('Network response was not ok')
    }
  }
  return response.json();
};

export const useGetTodo =  (id: any) => {
  return useQuery('getTodo', async () => await getTodo(id), {
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

export const usePutTodo =  (id: any, payload:any) => {
  return useMutation('putTodo', async () => await putTodo(id, payload)); 
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

export const usePostTodo =  (payload:any) => {
  return useMutation('postTodo', async () => await postTodo(payload)); 
};