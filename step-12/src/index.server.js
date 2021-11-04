// import React from 'react';
// import ReactDOMServer from 'react-dom/server';

// const html = ReactDOMServer.renderToString(
//   <div>Hello Server Side Rendering!</div>,
// );

// console.log(html);

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수
const serverRender = (req, res, next) => {
  // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 합니다.
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  );

  const root = ReactDOMServer.renderToString(jsx);  // 렌더링을 하고
  res.send(root); // 클라이언트에 결과물 응답
};

app.use(serverRender);

app.listen(5000, () => {
  console.log('http://localhost:5000 started!');
});