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

# theme
* https://mui.com/material-ui/customization/theming/
* https://mui.com/material-ui/customization/color/
* https://www.w3schools.com/colors/colors_rgb.asp
```
기본테마, 추가속성, 컴포넌트별 변경
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