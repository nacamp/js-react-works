import { areArraysEqual } from '@mui/base';
import {
  useQuery,
  useMutation,
} from 'react-query'
import { getToken, removeToken } from '../components/Token';

function makeJwtHeader(){
  const token = getToken();
  if(token){
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
      return {}
    } else {
      throw new Error('Network response was not ok')
    }
  }
  return response.json();
};

export const useGetTodo = (id: any) => {
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

export const usePutTodo = (id: any, payload: any) => {
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

export const usePostTodo = (payload: any) => {
  return useMutation('postTodo', async () => await postTodo(payload));
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

function aa() {
  console.log('xxxxx');
}
export const xxxSignIn2 = (payload: any) => {
  console.log('useSignIn2:input:', payload);
  return aa();
};

// export const useSignIn =  (payload:any) => {
//   return useQuery('signIn', async () => await signIn(payload), {
//     enabled: false
//   });
// };