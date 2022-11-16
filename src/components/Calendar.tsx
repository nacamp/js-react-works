import React, { useState, useEffect } from "react";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { range } from "../util";

interface IBoxButton {
  date: string;
  thisMonth: boolean;
  onOpen: (text: number) => void;
}

function BoxButton({ date, thisMonth, onOpen }: IBoxButton) {
  function handleOpen(event: React.MouseEvent<HTMLElement>, text: string) {
    // console.log(text);
    const id: number = +text;
    onOpen(id);
  }

  return (
    <Button
      sx={{
        pb: 8,
        textAlign: "left",
        color: "black",
        width: 2 / 2,
        height: 2 / 2,
        display: "block",
        bgcolor: thisMonth ? grey[50] : grey[300],
      }}
      onClick={(e) => handleOpen(e, date)}
      variant="text"
    >
      <Typography
        sx={{ color: dayjs().format("YYYYMMDD") === date ? "red" : "black" }}
        variant="body2"
      >
        {" "}
        {date.substring(6)}{" "}
      </Typography>
    </Button>
  );
}

interface IFormRow {
  dates: Array<Array<[string, number]>>;
  onOpen: (text: number) => void;
}
function FormRow({ dates, onOpen }: IFormRow) {
  function handleOpen(id: number) {
    onOpen(id);
  }

  return (
    <>
      {dates.map((row: any) => (
        <Grid key={row} item xs={12 / 7} style={{ border: "1px dotted grey" }}>
          <BoxButton date={row[0]} thisMonth={row[1]} onOpen={handleOpen} />
        </Grid>
      ))}
    </>
  );
}

function fillDay(date: string) {
  const array7x6 = [];
  const weekDay = dayjs(date).day();
  // 전달
  const prevMonth = range(weekDay).map((row) => [
    dayjs(date)
      .add(-(row + 1), "day")
      .format("YYYYMMDD"),
    false,
  ]);
  array7x6.push(...prevMonth.reverse());

  // 이번달
  const month = dayjs(date).month();
  for (let i = 0; i < 31; i++) {
    const d = dayjs(date).add(i, "day");
    if (d.month() !== month) {
      break;
    }
    array7x6.push([d.format("YYYYMMDD"), true]);
  }

  // 다음달
  const nextMonth = dayjs(date).add(1, "month");
  const currentLength = array7x6.length;
  for (let i = 0; i < 7 * 6 - currentLength; i++) {
    const d = dayjs(nextMonth).add(i, "day");
    array7x6.push([d.format("YYYYMMDD"), false]);
  }
  return array7x6;
}

export interface ICalendar {
  yearMonth: string;
  onOpen: (id: number) => void;
  // onPut: (id: any, payload: any) => void;
  // onPost: (payload: any) => void;
}
export function Calendar({ yearMonth, onOpen }: ICalendar) {
  const [days7x6, setDays7x6] = useState<Array<any>>([]);
  const weekSize = 7;
  const weekNames = ["일", "월", "화", "수", "목", "금", "토"];
  useEffect(() => {
    const days = fillDay(yearMonth + "01");
    const s7x6 = [];
    for (let i = 0; i < days?.length; i += weekSize) {
      const week = days.slice(i, i + weekSize);
      s7x6.push(week);
    }
    setDays7x6(s7x6);
  }, [yearMonth]);

  function handleOpen(id: number) {
    onOpen(id);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid key={-1} container item>
            {weekNames.map((row: any, i) => (
              <Grid key={i} item xs={12 / 7}>
                <Typography variant="h6" align="center">
                  {row}
                </Typography>
              </Grid>
            ))}
          </Grid>
          {days7x6.map((row, i) => (
            <Grid key={i} container item>
              <FormRow dates={row} onOpen={handleOpen} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
