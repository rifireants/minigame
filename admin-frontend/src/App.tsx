import { Admin, Resource, EditGuesser } from 'react-admin';
import UserList from './UserList';
import UserEdit from './UserEdit';
import DepositList from './DepositList';
import WithdrawalList from './WithdrawalList';
import WithdrawalEdit from './WithdrawalEdit';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import i18nProvider from './i18nProvider';
import MyLayout from './MyLayout';
import BetList from './BetList';

import { CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';
import SettingsPage from './SettingsPage';
import RoundsPage from './RoundsPage';
import { BetEdit } from './BetEdit';

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} i18nProvider={i18nProvider} layout={MyLayout}>
      <Resource name="users" list={UserList} edit={UserEdit} />
      <Resource name="deposits" list={DepositList} edit={EditGuesser} />
      <Resource name="withdrawals" list={WithdrawalList} edit={WithdrawalEdit} />
      <Resource name="bets" list={BetList} edit={BetEdit} />
      <CustomRoutes>
        <Route path="/rounds/*" element={<RoundsPage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
