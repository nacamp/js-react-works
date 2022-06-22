import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard'
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient();
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
