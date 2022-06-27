import { TodoTemplate, } from '../components/TodoTemplate'
import { useGetTodo, usePutTodo, usePostTodo} from '../hooks/api';

function FuturePage() {
    return (
        <TodoTemplate id={20000101} onGet={useGetTodo} onPut={usePutTodo} onPost={usePostTodo} >
            <div>Future</div>
        </TodoTemplate>
    );
}

export default FuturePage;