import {
  List,
  Datagrid,
  TextField,
  SimpleList,
} from 'react-admin';
import { useMediaQuery } from '@mui/material';

const UserList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.username}
          secondaryText={record => record.email}
          tertiaryText={record => `${record.point}P`}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="username" />
          <TextField source="email" />
          <TextField source="point" />
        </Datagrid>
      )}
    </List>
  );
};

export default UserList;
