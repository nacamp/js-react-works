import { Button, Typography, Paper, TextField } from '@mui/material';
import dayjs from 'dayjs';

function showWeekDay(day: string | number) {
  const text:any = { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' };
  const i = dayjs(String(day)).day();
  return text[i];
}

function TodoReadOnlyList({ data, onOpen }: { data: any; onOpen: (id: number) => void }) {
  const checkedStyle = {
    color: 'grey',
    textDecorationLine: 'line-through',
  };
  function handleOpen(event: React.MouseEvent<HTMLElement>, text: string) {
    console.log(text);
    const id: number = +text;
    onOpen(id);
  }

  return (
    <>
      {data &&
        data.map((list: any) => (
          <Paper elevation={3} sx={{ m: 1, p: 1 }}>
            <Button onClick={(e) => handleOpen(e, list.id)} variant="text">
              <Typography variant="h6" color="primary" gutterBottom>
                {dayjs(String(list.id)).format('YYYY년 MM월 DD일 ')}{showWeekDay(list.id)}
              </Typography>
            </Button>
            {list.data.map((row: any) => (
              <TextField
                sx={{ m: 1, p: 1 }}
                style={!!row.done ? checkedStyle : {}}
                fullWidth
                multiline
                label={row.label}
                value={row.text}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            ))}
          </Paper>
        ))}
    </>
  );
}
export { TodoReadOnlyList };
// export default TodoReadOnlyList;
