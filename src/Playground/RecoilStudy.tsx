import { useEffect, useState, useRef } from "react";
import { atom, useRecoilState } from "recoil";
import Typography from "@mui/material/Typography";
import { SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
const dataState = atom({
  key: "data",
  default: "",
});

export default function RecoilStudy() {
  const [data, setData] = useRecoilState(dataState);
  const [sdata, setSdata] = useState('');
  const nextId = useRef('');
  console.log('called');

  useEffect(() => {
    setData("init");
    setSdata('init')
    console.log('nexitid', nextId.current);
    nextId.current = 'nextId';
    // 페이지가 렌더링이 된후에 자료를 볼수 있다. 바로 볼수는 없다.
    console.log("data[]", data );
    console.log("sdata[]", sdata );
    console.log('nextid', nextId.current);
  }, []);

  useEffect(() => {
    console.log("[data]", data );
    console.log("[sdata]", sdata);
  }, [data,sdata]);

  // useEffect(() => {
  //   console.log("[sdata]", sdata);
  // }, [sdata]);
  function handleClick(){
    setData("click");
    setSdata('click')
    // 페이지가 렌더링이 된후에 자료를 볼수 있다. 바로 볼수는 없다.
    console.log("click data", data );
    console.log("click sdata", sdata );
  }

  return (
    <>
      <Typography variant="h5">recoil</Typography>
      <button onClick={()=>handleClick()}></button>
      <div> {data}-{sdata}</div>
    </>
  );
}
