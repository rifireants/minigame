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
        <Datagrid>
          <FunctionField label="resources.bets.fields.userId" render={r => r?.user?.userid ?? r.userId} />

          <FunctionField
            label="resources.bets.fields.hlResult"
            render={r => r?.round?.sum > 10 ? '대' : '소'}
          />
          <FunctionField
            label="resources.bets.fields.oeResult"
            render={r => (r?.round?.sum % 2 === 0 ? '짝' : '홀')}
          />

          <NumberField source="amount" label="resources.bets.fields.amount" />

          <FunctionField
            label="resources.bets.fields.diceResult"
            render={r =>
              r?.round
                ? `${r.round.dice1}, ${r.round.dice2}, ${r.round.dice3}`
                : '-'
            }
          />

          <NumberField source="payout" label="resources.bets.fields.payout" />
          <TextField source="result" label="resources.bets.fields.result" />
          <DateField source="createdAt" label="resources.bets.fields.createdAt" showTime />
        </Datagrid>
      )}
    </List>
  );
};

export default BetList;
