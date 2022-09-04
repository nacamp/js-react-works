import React from "react";
import { RecoilRoot } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";

import { getHost } from "../config";
import CalendarPage from "./Calendar";
import handlers from "../mocks/handlers";

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

const queryClient = new QueryClient();

const Template = (args) => <CalendarPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  yearMonth: '202209',
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

      rest.get(`${getHost()}/todos/:id`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            status: 200,
            data: [
              {
                id: 2,
                text: `${req.params.id} data1`,
                done: false,
                label: "위상수학",
              },
              {
                id: 1,
                text: `${req.params.id} data2`,
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
        return res(ctx.status(201), ctx.json(req.body));
      }),
    ],
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "pages/Calendar",
  component: CalendarPage,
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