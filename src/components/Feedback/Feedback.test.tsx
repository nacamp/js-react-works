import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react'
import * as React from 'react'
import {Fallback, Toast} from '.'

describe('Fallback', () => {
  const message:string = '잠시만 기다려주세요.';
  test('true', () => {
    render(<Fallback open={true}/>)
    expect(screen.getByText(message)).toBeInTheDocument()
  });
  test('false', () => {
    render(<Fallback open={false}/>)
    expect(screen.queryByText(message)).toBeNull()
  });
});


describe('Toast', () => {
  const message:string = '잠시만 기다려주세요.';
  test('true', () => {
    let open = true;
    function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
      open = false;
    }
    render(<Toast open={open} severity={'error'} message={message} onClose={handleClose} />);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(open).toBe(true);
    fireEvent.click(screen.getByRole('button'));
    expect(open).toBe(false);
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
  });
  test('false', () => {
    render(<Toast open={false} severity={'error'} message={message}  />)
    expect(screen.queryByText(message)).toBeNull()
  });
});