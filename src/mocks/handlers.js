import { rest } from "msw";
import { getHost } from "../config";

export const handlers = [
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
            text: `${req.params.id} 스터디`,
            done: false,
            label: "개인",
          },
          {
            id: 1,
            text: `${req.params.id} 주간업무`,
            done: false,
            label: "회사",
          },
        ],
        id: 20220903,
      })
    );
  }),

  rest.put(`${getHost()}/todos/:id`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(req.body));
  }),
];
