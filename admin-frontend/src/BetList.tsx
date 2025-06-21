import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  FunctionField,
  SimpleList,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';

const BetList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={record => `유저: ${record?.user?.userid ?? record.userId}`}
          secondaryText={record => `베팅: ${record.amount}원`}
          tertiaryText={record => `결과: ${record.result}`}
        />
      ) : (
        <Datagrid rowClick={false}>
          <FunctionField label="아이디" render={r => r?.user?.userid ?? r.userId} />

          <FunctionField
            label="대소결과"
            render={r => r?.round?.sum > 10 ? '대' : '소'}
          />
          <FunctionField
            label="홀짝결과"
            render={r => (r?.round?.sum % 2 === 0 ? '짝' : '홀')}
          />

          <NumberField source="amount" label="베팅금액" />

          <FunctionField
            label="주사위결과"
            render={r =>
              r?.round
                ? `${r.round.dice1}, ${r.round.dice2}, ${r.round.dice3}`
                : '-'
            }
          />

          <NumberField source="payout" label="당첨금" />
          <TextField source="result" label="결과" />
          <DateField source="createdAt" label="베팅시간" showTime />
        </Datagrid>
      )}
    </List>
  );
};

export default BetList;
