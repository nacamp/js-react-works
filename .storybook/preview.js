import React from 'react'
import { RecoilRoot } from 'recoil';
import { ReactQueryCacheProvider, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
          color: grey[900],
          boxShadow: "0px 1px 1px -1px"
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


// const queryCache = new QueryCache();
const queryClient = new QueryClient();
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
export const decorators=[
  (story) => (
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        {story()}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>

  ),
]