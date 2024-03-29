# TODO
* msw  mock service worker
# 문법
* arrow function
* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions
* event function naming
* https://jaketrent.com/post/naming-event-handlers-react
* https://blog.sonim1.com/220
* typescript-cheatsheet
* https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
* type vs interface
* https://medium.com/humanscape-tech/type-vs-interface-%EC%96%B8%EC%A0%9C-%EC%96%B4%EB%96%BB%EA%B2%8C-f36499b0de50
* https://blog.logrocket.com/types-vs-interfaces-in-typescript/
* export
* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export
* catch(error:any)
* String, Number => string, number로 사용
* not assignable to parameter of type 'never' 
* https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript
# react troubleshooting
* exhaustive-deps
* https://bobbyhadz.com/blog/react-hooks-exhaustive-deps
* https://kyounghwan01.github.io/blog/React/exhaustive-deps-warning/
* 함수형 업데이트, 상태값
* React.useState does not reload state from props
* https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
* Warning: Each child in a list should have a unique "key" prop
* key="uniqueId1" 사용
* https://crong-dev.tistory.com/47
* Maximum Update Depth Exceeded, useState 참조방법
* https://typeofnan.dev/fix-the-maximum-update-depth-exceeded-error-in-react/
* < useState에서 {x}[x] 자기자신을 변경하고 참조에서 문제발생

# mui troubleshooting
* Warning: Failed prop type: The prop `spacing` of `Grid` can only be used together with the `container` prop
* grid item의  spacing 제거

# storybook troubleshooting
* 돌아가던 사이트가 mock관련된 에러가 나서  yarn init-msw 를 실행하고 나니 정상동작함
# css
```
mui styled
https://mui.com/system/styled/
https://stackoverflow.com/questions/69730364/what-is-the-purpose-of-shouldforwardprop-option-in-styled

mui transitions
https://mui.com/material-ui/customization/transitions/
css transition
https://www.w3schools.com/css/css3_transitions.asp
https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions

drawer
https://mui.com/material-ui/api/drawer/


css
https://developer.mozilla.org/ko/docs/Web/CSS

css position (relative, absolute)
https://creamilk88.tistory.com/197
https://developer.mozilla.org/ko/docs/Web/CSS/position

css calc
https://developer.mozilla.org/ko/docs/Web/CSS/calc

&
https://stackoverflow.com/questions/13608855/what-does-an-before-a-pseudo-element-in-css-mean

import styled from 'styled-components'
https://styled-components.com/docs/api
https://react.vlpt.us/styling/03-styled-components.html
```

# msw
* https://github.com/DennisKo/react-msw-demo
* https://intrepidgeeks.com/tutorial/develop-and-test-response-applications-using-response-queries-msw-and-response-test-libraries
* https://mswjs.io/docs/getting-started

# storybook
```
https://storybook.js.org/tutorials/intro-to-storybook/react/ko/get-started/
https://velog.io/@juno7803/Storybook-Storybook-200-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0

snapshot issue
https://github.com/storybookjs/storybook/issues/17985

.env
root: .env
process.env.TOKEN
주의할점 변경사항을 적용할려면 storybook을 재실행해야 한다.
```

## typescript & craco지원
```
typescript와 craco 지원
package.json
"storybook-preset-craco": "0.0.6" 추가 
"webpack": "^5.73.0" 제거

main.js
module.exports = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/containers/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/pages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "@storybook/preset-create-react-app",
    "storybook-preset-craco",
  ],
  framework: "@storybook/react",
  // core: {
  //   builder: "@storybook/builder-webpack5",
  // },
  features: {
    interactionsDebugger: true,
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

preview.js
import { initialize, mswDecorator } from "msw-storybook-addon";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/storybook/ThemeDecorator"; //theme설정파일
// Initialize MSW
initialize();

// eslint-disable-next-line import/no-anonymous-default-export
export const decorators = [
  mswDecorator,
  (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
];

SplitButton.stories.tsx
import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SplitButton from ".";

export default {
  component: SplitButton,
} as ComponentMeta<typeof SplitButton>;

const Template: ComponentStory<typeof SplitButton> = (args) => (
  <SplitButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  buttons: [
    {
      visible: true,
      disabled: true,
      label: `visible:true,disabled:true`,
      onClick: action("clicked"),
    },
  ],
};

https://storybook.js.org/docs/react/writing-stories/args
https://github.com/storybookjs/storybook/issues/14789
```


# test
```
추가설정
"jest-watch-typeahead": "0.6.5"
https://github.com/facebook/create-react-app/issues/11043#issuecomment-942472592

리액트의 테스트는 한계가 분명이 있고, MUI를 사용하면 더 테스트가 힘든것 같다.

lib
https://github.com/testing-library/react-testing-library
https://www.npmjs.com/package/@testing-library/react
https://www.npmjs.com/package/@testing-library/jest-dom

tutorial
https://www.robinwieruch.de/react-testing-library/
https://www.digitalocean.com/community/tutorials/how-to-test-a-react-app-with-jest-and-react-testing-library
query
https://testing-library.com/docs/queries/about
role
https://www.w3.org/TR/html-aria/#docconformance
screen
https://testing-library.com/docs/queries/about#screen
event
https://testing-library.com/docs/user-event/intro/
https://ph-fritsche.github.io/blog/post/why-userevent
https://testing-library.com/docs/ecosystem-user-event
https://github.com/testing-library/user-event
act, await
https://stackoverflow.com/questions/68364947/react-testing-library-waitfor-vs-act
https://www.daleseo.com/react-testing-library-async/
? act
https://flyingsquirrel.medium.com/testing-library-react%EC%9D%98-act%EB%8A%94-%EC%96%B8%EC%A0%9C-%EC%8D%A8%EC%95%BC%ED%95%A0%EA%B9%8C-c6036a8cd4b3
https://flyingsquirrel.medium.com/when-should-i-use-act-in-react-testing-library-d7dd22a3340e

setup
https://testing-library.com/docs/react-testing-library/setup/

jest
https://jestjs.io/docs/expect
https://jestjs.io/docs/mock-functions

troubleshooting
https://velog.io/@iamchanii/react-testing-library-%EC%82%AC%EC%9A%A9-%EC%8B%9C-%EC%A3%BC%EC%9D%98%EC%82%AC%ED%95%AD-80k0olhdm6
mui select
https://codesandbox.io/s/cec0z

sample 자세히 안봄
https://ui.toast.com/weekly-pick/ko_20210630
```
# error boundary
* https://react.vlpt.us/basic/26-componentDidCatch-and-sentry.html
* https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/
* https://github.com/bvaughn/react-error-boundary
* https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers

# theme
* https://mui.com/material-ui/customization/theming/
* https://mui.com/material-ui/customization/color/
* https://www.w3schools.com/colors/colors_rgb.asp
```
기본테마, 추가속성, 컴포넌트별 변경
```

# s3
* https://react-etc.vlpt.us/08.deploy-s3.html
* https://stackoverflow.com/questions/51218979/react-router-doesnt-work-in-aws-s3-bucket
```
-package.json
"deploy": "aws s3 sync ./build s3://jimmy.widsign.com --profile=default"

profile값은
cat .aws/config
[default] 

-bucket
오류문서: index.html
리로드시 없는 key라고 나오는 문제해결(react-router 사용시)
```

# server
```
-package.json
{
    "name": "my-app",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "json-server-auth": "2.1.0",
        "json-server": "0.17.0",
        "cors": "2.8.5"
    },
    "scripts": {
        "start": "node ./app"
    }
}
-app.js
const jsonServer = require('json-server')
const cors = require('cors');
const auth = require('json-server-auth')

const app = jsonServer.create()
app.use(cors({
    origin: '*'
}));
const router = jsonServer.router('db.json')
app.db = router.db
app.use(auth)
app.use(router)
app.listen(4000)

```

# recoil
* https://recoiljs.org/ko/docs/api-reference/core/RecoilRoot
* https://velog.io/@dldngus5/TILReact-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EA%B3%A0%EB%AF%BC-Context-Recoil

# dayjs
* https://day.js.org/
* https://jsikim1.tistory.com/196

# jwt
```

curl -d '{"email": "olivier@mail.com","password": "bestPassw0rd"}'  \
-H "Content-Type: application/json" \
-X POST http://localhost:5000/register

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE2NTUzNzg4NTIsImV4cCI6MTY1NTM4MjQ1Miwic3ViIjoiMSJ9.qKJFIrkkMkCA0XTJV0oO2U2AdZEQINwqoteK4yT__Bc",
  "user": {
    "email": "olivier@mail.com",
    "id": 1
  }
}%

curl -d '{"email": "olivier@mail.com","password": "bestPassw0rd"}'  \
-H "Content-Type: application/json" \
-X POST http://localhost:5000/login
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE2NTUzNzg5NTcsImV4cCI6MTY1NTM4MjU1Nywic3ViIjoiMSJ9.H2tT8fALZ0vosWBSFt3sE68jpn1eEJy-i_wLl32AwxA",
  "user": {
    "email": "olivier@mail.com",
    "id": 1
  }
}

curl -i -H "Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE2NTUzNzg5NTcsImV4cCI6MTY1NTM4MjU1Nywic3ViIjoiMSJ9.H2tT8fALZ0vosWBSFt3sE68jpn1eEJy-i_wLl32AwxA" -H "Content-Type: application/json" http://localhost:5000/600/users/1


curl -i -H "Authorization:  Bearer 1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE2NTUzNzg5NTcsImV4cCI6MTY1NTM4MjU1Nywic3ViIjoiMSJ9.H2tT8fALZ0vosWBSFt3sE68jpn1eEJy-i_wLl32AwxA" -H "Content-Type: application/json" http://localhost:5000/600/users/1

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE2NTUzNzg5NTcsImV4cCI6MTY1NTM4MjU1Nywic3ViIjoiMSJ9.H2tT8fALZ0vosWBSFt3sE68jpn1eEJy-i_wLl32AwxA",
  "user": {
    "email": "olivier@mail.com",
    "id": 1
  }
}%

https://jwt.io/
https://velopert.com/2389


curl http://localhost:5000/posts/5


json-server-auth --watch /Users/jimmy/vscode/js-react-works/db.json --port 5000


npm install -g json-server-auth
npm install -g express
https://www.npmjs.com/package/json-server-auth
```


# dialog
* https://medium.com/the-clever-dev/how-to-size-and-position-the-material-ui-mui-dialog-component-a5601cedc1c9
* https://mui.com/material-ui/react-dialog/
* https://mui.com/material-ui/api/paper/

# progress
* https://mui.com/material-ui/react-progress/
# snackbar, alert
* https://mui.com/material-ui/react-snackbar/
* https://mui.com/material-ui/react-alert/

# network
## react-query, fetch
```
https://react-query.tanstack.com/quick-start
async await
https://tylerclark.dev/react-query/
v3
https://react-query-v3.tanstack.com/
https://kyounghwan01.github.io/blog/React/react-query/basic/#usequery
https://merrily-code.tistory.com/76
```
## fetch
* https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
* https://rapidapi.com/guides/fetch-api-async-await
* https://velog.io/@eunbinn/Axios-vs-Fetch
* https://blog.logrocket.com/axios-vs-fetch-best-http-requests/

## json-server
* https://www.npmjs.com/package/json-server
```
자료
    {
      "id": 20220614,
      "data" : [
        { "id": 1, "text": "프로젝트 생성하기", "done": true, "label" : "오늘" } ,
        { "id": 2, "text": "프로젝트 생성하기", "done": true, "label" : "내일" } 
      ]
    }
package.json proxy 설정
https://react.vlpt.us/redux-middleware/09-cors-and-proxy.html

json-server --watch /Users/jimmy/vscode/js-react-works/db.json --port 5000
curl http://localhost:5000/todos/20220614
curl -d '{"id": 5,"title": "json-server4","author": "typicode"}'  \
-H "Content-Type: application/json" \
-X POST http://localhost:5000/posts
curl http://localhost:5000/posts/5

npm install -g json-server
https://m.blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=wideeyed&logNo=221350638501
```

# textinput
* icon
* https://mui.com/material-ui/material-icons/
* grid
* https://smartdevpreneur.com/the-complete-guide-to-material-ui-grid-align-items/
* typescript
* https://www.typescriptlang.org/ko/docs/handbook/2/generics.html

# react-router-dom v6
* https://velog.io/@soryeongk/ReactRouterDomV6
* https://reactrouter.com/docs/en/v6/getting-started/overview
* https://typescript.tv/react/upgrade-to-react-router-v6/
* https://kkj6670.github.io/board/react/react-router-dom-v6
* https://velog.io/@velopert/react-router-v6-tutorial

# 페이지구조
* mui
* https://github.com/mui/material-ui/tree/v5.8.3/docs/data/material/getting-started/templates
* https://mui.com/material-ui/getting-started/templates/
* sx https://mui.com/system/the-sx-prop/
* vh https://webclub.tistory.com/356
* sx sm md https://mui.com/material-ui/customization/breakpoints/
* react
* fragment https://velog.io/@lilyoh/React-Fragments-%EC%82%AC%EC%9A%A9%EC%9D%B4%EC%9C%A0-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EB%B2%95

# 설치
* npx create-react-app my-app --template typescript
* https://create-react-app.dev/docs/adding-typescript/

# 기타
* https://goodmemory.tistory.com/126