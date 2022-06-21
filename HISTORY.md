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

# react
* React.useState does not reload state from props
* https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
* Warning: Each child in a list should have a unique "key" prop
* key="uniqueId1" 사용
* https://crong-dev.tistory.com/47

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