import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SimpleList,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';

const BetList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={record => `User #${record.userId}`}
          secondaryText={record => `${record.amount}원 / ${record.betType}`}
          tertiaryText={record => `결과: ${record.result}`}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="userId" />
          <NumberField source="amount" />
          <TextField source="betType" />
          <TextField source="result" />
          <TextField source="status" />
          <DateField source="createdAt" />
        </Datagrid>
      )}
    </List>
  );
};

export default BetList;
