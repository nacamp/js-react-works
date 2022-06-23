import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard'
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary : {
          backgroundColor: 'white',
          color: grey[900],
          boxShadow:"0px 1px 1px -1px"
        },
        // root: ({ ownerState }) => ({
        //   ...(ownerState.color === 'primary' && {
        //       backgroundColor: 'red',
        //       color: 'blue',
        //     }),
        // }),
      },
    }
  }
});

const queryClient = new QueryClient();
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
