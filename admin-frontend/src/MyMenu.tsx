// src/MyMenu.tsx
import { Menu, MenuItemLink, useSidebarState } from 'react-admin';
import { useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CasinoIcon from '@mui/icons-material/Casino';

const MyMenu = () => {
  const [open] = useSidebarState();
  const location = useLocation();
  const isSelected = (path: string) => location.pathname === path;

  return (
    <Menu>
      <MenuItemLink
        to="/users"
        primaryText="회원관리"
        leftIcon={<PeopleIcon />}
        sidebarIsOpen={open}
        selected={isSelected('/users')}
      />
      <MenuItemLink
        to="/deposits"
        primaryText="입금관리"
        leftIcon={<AttachMoneyIcon />}
        sidebarIsOpen={open}
        selected={isSelected('/deposits')}
      />
      <MenuItemLink
        to="/withdrawals"
        primaryText="출금관리"
        leftIcon={<AttachMoneyIcon />}
        sidebarIsOpen={open}
        selected={isSelected('/withdrawals')}
      />
      <MenuItemLink
        to="/bets"
        primaryText="베팅내역"
        leftIcon={<CasinoIcon />}
        sidebarIsOpen={open}
        selected={isSelected('/bets')}
      />
      <MenuItemLink
        to="/rounds"
        primaryText="회차관리"
        leftIcon={<CasinoIcon />}
        sidebarIsOpen={open}
        selected={isSelected('/rounds')}
      />
      <MenuItemLink
        to="/settings"
        primaryText="설정"
        leftIcon={<SettingsIcon />}
        sidebarIsOpen={open}
        selected={isSelected('/settings')}
      />
    </Menu>
  );
};

export default MyMenu;
