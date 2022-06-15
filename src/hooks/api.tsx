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
    throw new Error('Network response was not ok')
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
  // console.log('yyyy');
  // console.log(payload);
  // console.log(JSON.stringify(payload))
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