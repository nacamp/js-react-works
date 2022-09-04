// import React, { useState, useRef, useEffect } from 'react';
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { useGetTodo, usePutTodo, usePostTodo } from "../hooks/api";
import { TodoTemplate, TodoTitle } from "../containers/TodoTemplate";

function TodoTemplatePage() {
  const { id } = useParams();
  const nid = !!id ? Number(id) : Number(dayjs(new Date()).format("YYYYMMDD"));
  return (
    <TodoTemplate
      id={nid}
      onGet={useGetTodo}
      onPut={usePutTodo}
      onPost={usePostTodo}
    >
      {" "}
      <TodoTitle id={nid} />
    </TodoTemplate>
  );
}

export { TodoTemplatePage as default };
