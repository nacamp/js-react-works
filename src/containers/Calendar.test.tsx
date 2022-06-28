import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {Calendar} from './Calendar';

describe('Calendar', () => {
    test('Calendar', () => {
        render(
        <Calendar yearMonth='202206'/>
        );
        expect(screen.getAllByText('29').length).toBe(2);
        expect(screen.getAllByText('30').length).toBe(2);

        expect(screen.getAllByText('01').length).toBe(2);
        expect(screen.getAllByText('09').length).toBe(2);
    });

});
