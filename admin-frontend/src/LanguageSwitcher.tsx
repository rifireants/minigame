import { useLocale, useSetLocale } from 'react-admin';
import { Box, Select, MenuItem } from '@mui/material';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const setLocale = useSetLocale();

  return (
    <Box sx={{ minWidth: 100, mx: 2 }}>
      <Select
        value={locale}
        onChange={e => setLocale(e.target.value)}
        variant="standard"
        size="small"
      >
        <MenuItem value="ko">KO</MenuItem>
        <MenuItem value="en">EN</MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;
