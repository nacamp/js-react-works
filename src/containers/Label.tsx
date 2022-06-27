import { TodoTemplate, } from '../components/TodoTemplate'
import { useGetLabel, usePutLabel, usePostTodo, useGetRoutine, usePutRoutine, usePostRoutine } from '../hooks/api';

function LabelPage() {
    return (
        <TodoTemplate id={0} name='label' onGet={useGetLabel} onPut={usePutLabel} onPost={usePostRoutine} >
            <div>Label</div>
        </TodoTemplate>
    );
}

export default LabelPage;