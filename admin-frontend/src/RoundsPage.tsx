import {
  Title,
  useNotify,
  useRefresh,
  useDataProvider,
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  SimpleForm,
  SaveButton,
  FunctionField,
} from 'react-admin';
import { Box, Stack, Button } from '@mui/material';
import { useState } from 'react';
import { TextInput } from 'react-admin';

const RoundCreateToolbar = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();
  const token = localStorage.getItem('token');

  const [startTime, setStartTime] = useState(() => {
    const now = new Date();
    now.setSeconds(0, 0);

    const pad = (n: number) => String(n).padStart(2, '0');

    const local = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    return local;
  });
  const [interval, setInterval] = useState(3);
  const [count, setCount] = useState(10);
  const [memo, setMemo] = useState();

  const handleGenerate = async () => {
    try {
      const localDate = new Date(startTime); // 로컬 시간 → Date 객체
      const utcISOString = localDate.toISOString(); // ✅ UTC 기준 ISO 문자열로 변환

      await fetch(`${process.env.REACT_APP_API_URL}/rounds/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startTime: utcISOString, // ✅ 서버는 UTC로 해석
          interval,
          count,
          memo,
        }),
      });
      notify('회차가 생성되었습니다', { type: 'success' });
      refresh();
    } catch (error) {
      console.error(error);
      notify('회차 생성 중 오류 발생', { type: 'error' });
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <SimpleForm toolbar={false} onSubmit={handleGenerate}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextInput
            label="시작 시간"
            source="startTime"
            type="datetime-local"
            defaultValue={startTime}
            onChange={e => setStartTime(e.target.value)}
            fullWidth
          />
          <TextInput
            label="회차 간격 (분)"
            source="interval"
            type="number"
            defaultValue={interval}
            onChange={e => setInterval(parseInt(e.target.value, 10))}
            fullWidth
          />
          <TextInput
            label="생성 개수"
            source="count"
            type="number"
            defaultValue={count}
            onChange={e => setCount(parseInt(e.target.value, 10))}
            fullWidth
          />
          {/* <TextInput
            label="메모"
            source="memo"
            value={memo}
            onChange={e => setMemo(e.target.value)}
            fullWidth
          /> */}
          <SaveButton label="회차 생성" alwaysEnable />
        </Stack>
      </SimpleForm>
    </Box>
  );
};

const RoundsPage = () => {
  return (
    <Box p={2}>
      <Title title="회차관리" />
      <RoundCreateToolbar />
      <List resource="rounds" title="" actions={false}>
        <Datagrid>
          <TextField source="round" label="회차번호" />
          <DateField source="startTime" label="시작시간" showTime />
          <NumberField source="dice1" label="주사위1" />
          <NumberField source="dice2" label="주사위2" />
          <NumberField source="dice3" label="주사위3" />
          <NumberField source="sum" label="총합" />
          {/* 👇 경기결과 (대/소 + 홀/짝) */}
          <FunctionField
            label="경기결과"
            render={record => {
              if (typeof record.sum !== 'number') return '';
              const size = record.sum >= 11 ? '대' : '소';
              const parity = record.sum % 2 === 0 ? '짝' : '홀';
              return `${size} ${parity}`;
            }}
          />
          {/* <TextField source="memo" label="메모" /> */}
          <NumberField source="participants" label="참여자 수" />
          <NumberField source="totalBet" label="총베팅액" />
          <TextField source="status" label="상태" />
        </Datagrid>
      </List>
    </Box>
  );
};

export default RoundsPage;
