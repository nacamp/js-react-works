export const getTodo = async (id: any) => {
    console.log('xxxx');
    const url = "http://localhost:3000/todos/";
    const response = await fetch( `${url}${id}`,{
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    return response.json();
};
 
export const putTodo = async (id: any, payload:any) => {
    console.log('yyyy');
    // console.log(payload);
    console.log(JSON.stringify(payload))
    const url = "http://localhost:3000/todos/";
    const response = await fetch( `${url}${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    return response.json();
};

  /*
  import { useQuery, UseQueryResult } from "react-query";
useQuery(['todos', todoId], async () => {
    const response = await fetch('/todos/' + todoId)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  const query = useQuery('todos', getTodos)
  */