import '@testing-library/jest-dom'
//import { render, fireEvent, screen } from '@testing-library/react'
import { act, getByRole, fireEvent, render, screen, waitFor, IProps } from '../test/renderWithProviders';
import * as React from 'react'
// import { TodoCreate, TodoTemplate, ITodo } from './TodoTemplate'
// import { useRecoilState } from 'recoil';
// import UserEvent from "@testing-library/user-event";
// import { labelListState, useGetLabel, usePutLabel, usePostRoutine } from '../hooks/api';
// import SignIn from './SignIn';
// import { setHost } from '../config';

// setHost('http://localhost:5000');

// export const Wrapper: React.FC<IProps> = ({ children }) => {
//     return (
//         <>
//             {children}
//         </>
//     )
// }


// describe('SignIn', () => {
//     const mockFn = jest.fn();
//     test('SignIn', async () => {
//         const handleNavigate = jest.fn();

//         // render(
//         //     <Wrapper>
//         //         <SignIn onNavigate={handleNavigate} />
//         //     </Wrapper>
//         // );
//         // const emailField = screen.getByTestId('email').querySelector('input')
//         // if (emailField) {
//         //     fireEvent.change(emailField, { target: { value: 'olivier@mail.com' } });
//         //     console.log(emailField?.value)
//         //     expect(emailField?.value).toBe('olivier@mail.com');
//         // }
//         // const passwordField = screen.getByTestId('password').querySelector('input')
//         // if (passwordField) {
//         //     fireEvent.change(passwordField, { target: { value: 'bestPassw0rd' } });
//         //     console.log(passwordField?.value)
//         //     expect(passwordField?.value).toBe('bestPassw0rd');
//         // }
//         // UserEvent.click(screen.getByTestId("submit"));
//         // await waitFor(() => {
//         //     expect(handleNavigate).toHaveBeenCalledTimes(1);
//         //     console.log(window.sessionStorage.getItem("token"));
//         //     expect(window.sessionStorage.getItem("token")).toEqual(expect.anything());
//         // });
//     });

// });
