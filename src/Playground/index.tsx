import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactNumberFormat from "./ReactNumberFormat";
import MuiTextField from "./MuiTextField";
import RecoilStudy from "./RecoilStudy";



import Layout from "./Layout";

function Playground() {
  const { id } = useParams();
  console.log(id);
  if (id === "layout")
    return (
        <Layout/>
    );
  else
    return (
      <>
        <div>playground</div>
        <ReactNumberFormat />
        <MuiTextField />
        <RecoilStudy/>
      </>
    );
}
export { Playground as default };