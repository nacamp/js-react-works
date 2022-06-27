import '@testing-library/jest-dom'
//import { render, fireEvent, screen } from '@testing-library/react'
import { getByRole, fireEvent, render, screen, waitFor, IProps } from '../test/renderWithProviders';
import * as React from 'react'
import { TodoCreate, TodoTemplate, ITodo } from './TodoTemplate'
import { useRecoilState} from 'recoil';
import UserEvent from "@testing-library/user-event";
import { labelListState, useGetLabel, usePutLabel, usePostRoutine } from '../hooks/api';

export const Wrapper: React.FC<IProps> = ({ children }) => {
    const [labelList, setLabelList] = useRecoilState(labelListState);

    React.useEffect(() => {
        setLabelList([{
            "id": 3,
            "text": "회사",
            "done": false,
            "label": "오늘"
        },
        {
            "id": 2,
            "text": "Pworks",
            "done": false,
            "label": "오늘"
        },
        {
            "id": 0,
            "text": "오늘",
            "done": false,
            "label": "오늘"
        }]);
    }, []);
    return (
        <>
            {children}
        </>
    )
}


describe('TodoCreate', () => {
    const message: string = 'routineLabel';
    const mockFn = jest.fn();
    test('routineLabel', async () => {
        render(
        <Wrapper>
            <TodoCreate onTodoCreate={mockFn} onChange={mockFn} />
        </Wrapper>
        );
        expect(screen.queryByText(message)).toBeNull();
        screen.queryAllByRole('button').forEach( (el:any, i) =>{
            console.log(i);
            fireEvent.click(el);
        });
        // https://codesandbox.io/s/cec0z
        UserEvent.click(getByRole(screen.getByTestId("todoCreateSelect"), "button"));
        await waitFor(() => UserEvent.click(screen.getByText(/Pworks/i)));
        // TestingLibraryElementError: Found multiple elements with the text
        expect(screen.getAllByText('Pworks').length > 0).toBeTruthy();
        // MUI는 select박스가 바로 돔에 그려지지 않는것 같아서 테스트가 힘들다.
        // https://testing-library.com/docs/queries/about#screendebug
        // screen.debug()
    });
    test('routineLabel', async () => {
        render(
        <Wrapper>
            <TodoCreate onTodoCreate={mockFn} onChange={mockFn} routineLabel={message} />
        </Wrapper>
        );
        expect(screen.queryByText(message)).toBeInTheDocument();
        // https://testing-library.com/docs/queries/about#screendebug
        // screen.debug()
    });
});

describe.skip('TodoTemplate', () => {
    const message: string = 'routineLabel';
    const mockFn = jest.fn();
    test('routineLabel', async () => {
        render(
        <Wrapper>
            <TodoTemplate id={0} onGet={useGetLabel} onPut={usePutLabel} onPost={usePostRoutine} > test </TodoTemplate>
        </Wrapper>
        );
        expect(screen.queryByText(message)).toBeNull();
        // https://testing-library.com/docs/queries/about#screendebug
        screen.debug()
        // 복작한건 결국 테스트 할수 없다.
        // This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
    });
});