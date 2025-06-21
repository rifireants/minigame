import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MyMenu from './MyMenu'; // ✅ 커스텀 메뉴 추가

const MyLayout = (props: any) => (
  <Layout
    {...props}
    appBar={MyAppBar}
    menu={MyMenu} // ✅ 여기에 추가
  />
);

export default MyLayout;
