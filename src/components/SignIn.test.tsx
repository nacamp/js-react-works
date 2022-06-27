import '@testing-library/jest-dom'
//import { render, fireEvent, screen } from '@testing-library/react'
import { getByRole, fireEvent, render, screen, waitFor, IProps } from '../test/renderWithProviders';
import * as React from 'react'
import { TodoCreate, TodoTemplate, ITodo } from './TodoTemplate'
import { useRecoilState} from 'recoil';
import UserEvent from "@testing-library/user-event";
import { labelListState, useGetLabel, usePutLabel, usePostRoutine } from '../hooks/api';
import SignIn from './SignIn';

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


describe('SignIn', () => {
    const message: string = 'routineLabel';
    const mockFn = jest.fn();
    test('routineLabel', async () => {
        render(
        <Wrapper>
            <SignIn />
        </Wrapper>
        );
        const emailField  = screen.getByTestId('email').querySelector('input')
        if(emailField){
            fireEvent.change(emailField , {target: { value: 'email.com'}});
            console.log(emailField?.value)
            expect(emailField?.value).toBe('email.com');
        }

        const passwordField  = screen.getByTestId('email').querySelector('input')
        if(passwordField){
            fireEvent.change(passwordField , {target: { value: 'password'}});
            console.log(passwordField?.value)
            expect(passwordField?.value).toBe('password');
        }

        UserEvent.click(screen.getByTestId("submit"));
    });

});
