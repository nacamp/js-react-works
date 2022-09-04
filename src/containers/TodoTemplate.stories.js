import React from "react";
import { action } from "@storybook/addon-actions";
import { TodoTemplate, TodoTitle } from "./TodoTemplate";
import {
  labelListState,
  useGetLabel,
  useGetTodo,
  usePutTodo,
  usePostTodo,
} from "../hooks/api";
import { getHost } from "../config";

import { RecoilRoot } from "recoil";
import { ReactQueryCacheProvider, QueryCache } from "react-query";
//import { ReactQueryDevtools } from "react-query-devtools";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
          color: grey[900],
          boxShadow: "0px 1px 1px -1px",
        },
      },
    },
  },
});

// const queryCache = new QueryCache();
const queryClient = new QueryClient();

const Template = (args) => <TodoTemplate {...args}></TodoTemplate>;

export const Default = Template.bind({});
Default.args = {
  children: <TodoTitle id={20220903} />,
  id: 20220903,
  onGet: useGetTodo,
  onPut: usePutTodo,
  onPost: usePostTodo,
};

Default.parameters = {
  msw: {
    handlers: [
      rest.get(`${getHost()}/label`, (req, res, ctx) => {
        return res(
          ctx.json({
            id: 0,
            data: [
              {
                id: 3,
                text: "회사",
                done: false,
                label: "오늘",
              },
              {
                id: 2,
                text: "Pworks",
                done: false,
                label: "오늘",
              },
              {
                id: 1,
                text: "매주",
                done: false,
                label: "오늘",
              },
              {
                id: 0,
                text: "오늘",
                done: false,
                label: "오늘",
              },
            ],
          })
        );
      }),

      rest.get(`${getHost()}/todos/20220903`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            status: 200,
            data: [
              {
                id: 2,
                text: "test33333",
                done: false,
                label: "위상수학",
              },
              {
                id: 1,
                text: "111헬스클럽",
                done: false,
                label: "매주",
              },
            ],
            id: 20220903,
          })
        );
      }),

      rest.put(`${getHost()}/todos/20220903`, (req, res, ctx) => {
        console.log(req.body);
        return res(
          ctx.status(201),
          ctx.json(req.body)
        );
      }),

    ],
  },
};

// Default.parameters = {
//   msw: {
//     handlers: [
//       rest.get(`${getHost}/todos/20220903`, (req, res, ctx) => {
//         return res(
//           ctx.status(200),
//           ctx.json({
//           "status":200,
//           "data": [
//               {
//                   "id": 2,
//                   "text": "test1111",
//                   "done": false,
//                   "label": "위상수학"
//               },
//               {
//                   "id": 1,
//                   "text": "헬스클럽",
//                   "done": false,
//                   "label": "매주"
//               }
//           ],
//           "id": 20220903
//         }));
//       }),
//       rest.get('http://54.180.10.211:3333/label', (req, res, ctx) => {
//         return res(ctx.status(403));
//       }),
//     ],
//   },
// };

export default {
  title: "containers",
  component: TodoTemplate,
  decorators: [
    (story) => (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>{story()}</BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    ),
  ],
};

/*
data: (2) [{…}, {…}]
id: 20220903
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
  */
