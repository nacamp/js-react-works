import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { TodoTemplate } from './TodoTemplate'
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
    const RoutineList = [
        { id: 0, name: '일' }, { id: 1, name: '월' }, { id: 2, name: '화' }, { id: 3, name: '수' }, { id: 4, name: '목' }, { id: 5, name: '금' }, { id: 6, name: '토' },
    ];
    return (
        <>
            {RoutineList.map((row) => (
                <Box sx={{ m: 2, p: 2, border: 1, borderColor: '#f4f4f4' }}>
                    <TodoTemplate id={row.id} name={row.name} onGet={useGetRoutine} onPut={usePutRoutine} onPost={usePostRoutine} routineLabel='매주'>
                        <RoutineTitle name={row.name} />
                    </TodoTemplate>
                </Box>
            ))}
        </>
    );
}

export default RoutineTodo;