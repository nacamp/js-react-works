import React, { useState, useEffect } from "react";
import "dayjs/locale/ko";

import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ITodo } from ".";

// TODO: 항목이 하나도 없이 저장시 key에러가 난다. 나중에 수정필요
function TodoCreate({
  onTodoCreate,
  onChange,
  routineLabel,
  labelList,
}: {
  onTodoCreate: (todo: ITodo) => void;
  onChange: (text: string) => void;
  routineLabel?: string;
  labelList: ITodo[];
}) {
  // const responseLabel: any = useGetLabel(0); //초기설정, 이게없으면 리로드시 라벨이 없다.
  //const labelList = useRecoilValue(labelListState);
  const [text, setText] = useState("");
  const [label, setLabel] = React.useState(!!routineLabel ? routineLabel : "");
  useEffect(() => {
    if (labelList.length > 0) {
      setLabel("오늘");
    }
  }, [labelList]);

  function handleAdd(event: any) {
    if (text.trim() === "") {
      console.log("node data...");
      return;
    }
    const data = {
      id: 0,
      text,
      done: false,
      label,
    };
    onTodoCreate(data);
    setText("");
    onChange("");
  }

  const handleLabel = (event: any) => {
    console.log(event.target.value);
    setLabel(event.target.value as string);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {!routineLabel && (
            <FormControl variant="standard" sx={{ m: 1, mt: 2, minWidth: 100 }}>
              <Select
                data-testid="todoCreateSelect"
                value={label}
                label=""
                onChange={handleLabel}
              >
                {labelList.map((item: any, i) => (
                  <MenuItem key={i} value={item.text}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {!!routineLabel && <span>{routineLabel}</span>}
        </Grid>

        <Grid item xs={9}>
          <TextField
            fullWidth
            label="할일"
            value={text}
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setText(event.target.value);
              onChange(event.target.value);
            }}
            required
          />
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "right" }}>
          <IconButton size="small" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

export { TodoCreate };
