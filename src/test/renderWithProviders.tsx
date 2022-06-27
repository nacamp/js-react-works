import React, { FC, ReactElement, useEffect } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

export interface IProps {
  children?: React.ReactNode;
}

const AllTheProviders: FC<IProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>

    </RecoilRoot>
  )
}

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
  // const { rerender, ...renderResult } = render(ui, {wrapper: AllTheProviders, ...options});
  // return rerender(ui);
}

export * from '@testing-library/react'
export { renderWithProviders as render }
// https://testing-library.com/docs/react-testing-library/setup
// https://testing-library.com/docs/react-testing-library/api