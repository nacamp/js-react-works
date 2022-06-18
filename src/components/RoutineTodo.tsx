import {Divider, Typography}  from '@mui/material';

import {TodoTemplate}  from './TodoTemplate'
import { useGetTodo, usePutTodo, usePostTodo, useGetRoutine, usePutRoutine, usePostRoutine } from '../hooks/api';

interface IRoutineTitle {
    name: string;
}
function RoutineTitle(props: IRoutineTitle) {
    return (
        <Typography variant='h4'>
            {props.name}
        </Typography>
    );
};
 


function RoutineTodo() {

    return (
        <>
            <TodoTemplate id={0} name='일' onGet={useGetRoutine} onPut={usePutRoutine} onPost={usePostRoutine} showLabel={false}><RoutineTitle name='일' /></TodoTemplate>
            <Divider/>
            <TodoTemplate id={1} name='월' onGet={useGetRoutine} onPut={usePutRoutine} onPost={usePostRoutine} showLabel={false}><RoutineTitle name='월' /></TodoTemplate>
            <Divider/>
            <TodoTemplate id={2} name='화' onGet={useGetRoutine} onPut={usePutRoutine} onPost={usePostRoutine} showLabel={false}><RoutineTitle name='화' /></TodoTemplate>
            <Divider/>
            <TodoTemplate id={3} name='수' onGet={useGetRoutine} onPut={usePutRoutine} onPost={usePostRoutine} showLabel={false}><RoutineTitle name='수' /></TodoTemplate>
            <Divider/>
            <TodoTemplate id={4} name='목' onGet={useGetRoutine} onPut={usePutRoutine} onPost={usePostRoutine} showLabel={false}><RoutineTitle name='목' /></TodoTemplate>
            <Divider/>
            <TodoTemplate id={5} name='금' onGet={useGetRoutine} onPut={usePutRoutine} onPost={usePostRoutine} showLabel={false}><RoutineTitle name='금' /></TodoTemplate>
            <Divider/>
            <TodoTemplate id={6} name='토' onGet={useGetRoutine} onPut={usePutRoutine} onPost={usePostRoutine} showLabel={false}><RoutineTitle name='토' /></TodoTemplate>
        </>
    )

}
export default RoutineTodo;