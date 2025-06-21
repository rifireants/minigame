import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SimpleList,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';

const WithdrawalList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={record => `User #${record.userId}`}
          secondaryText={record => `${record.amount.toLocaleString()}원`}
          tertiaryText={record => record.status}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="userId" />
          <NumberField source="amount" />
          <TextField source="status" />
          <DateField source="createdAt" />
        </Datagrid>
      )}
    </List>
  );
};

export default WithdrawalList;
