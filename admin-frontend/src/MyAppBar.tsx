import { AppBar, TitlePortal } from 'react-admin';
import { Box } from '@mui/material';
import LanguageSwitcher from './LanguageSwitcher';

const MyAppBar = () => (
  <AppBar>
    <TitlePortal />
    <LanguageSwitcher />
  </AppBar>
);

export default MyAppBar;
