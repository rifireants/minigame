import {
  TextInput,
  NumberInput,
  BooleanInput,
  TimeInput,
  TabbedForm,
  FormTab,
  Title,
  useNotify,
  useRedirect,
  useGetOne,
  useUpdate,
  SaveButton,
  Toolbar,
} from 'react-admin';
import { Box } from '@mui/material';

const DEFAULT_SETTINGS = {
  allowTransaction: true,
  autoAmount: 0,
  startTime: '09:00',
  endTime: '23:00',
  depositMin: 10000,
  depositMax: 1000000,
  depositFee: 0,
  withdrawMin: 10000,
  withdrawMax: 1000000,
  withdrawFee: 0,
  withdrawFeeFixed: 0,
  allowGame: true,
  bettingTime: 30,
  resultTime: 5,
  disableTime: 10,
  bettingMin: 1000,
  bettingMax: 1000000,
  oddsBS: 2,
  oddsOE: 2,
  bankName: '',
  accountNumber: '',
  accountHolder: '',
  inviteCode: '',
  inviteBonus: 0,
};

const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const SettingsPage = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { data, isLoading } = useGetOne('settings', { id: 'singleton' });
  const [update] = useUpdate();

  const handleSubmit = async (values: any) => {
    try {
      await update('settings', {
        id: 'singleton',
        data: values,
        previousData: data || {},
      });
      notify('설정이 저장되었습니다', { type: 'success' });
      redirect('/');
    } catch (err) {
      notify('저장 실패', { type: 'error' });
    }
  };

  if (isLoading) return <>로딩 중...</>;
  const initialValues = data ?? DEFAULT_SETTINGS;

  return (
    <div style={{ padding: 20 }}>
      <Title title="전체 설정" />
      <TabbedForm onSubmit={handleSubmit} toolbar={<CustomToolbar />} defaultValues={initialValues}>
        <FormTab label="충전/환전">
          <Box display="flex" flexDirection="column" gap={2}>
            <BooleanInput source="allowTransaction" label="충환전 시스템 활성화" />
            <NumberInput source="autoAmount" label="자동승인한도" />
            <Box display="flex" gap={2}>
              <TimeInput source="startTime" label="시작시간" />
              <TimeInput source="endTime" label="끝시간" />
            </Box>
            <Box display="flex" gap={2}>
              <NumberInput source="depositMin" label="최소충전액" />
              <NumberInput source="depositMax" label="최대충전액" />
              <NumberInput source="depositFee" label="충전수수료율(%)" />
            </Box>
            <Box display="flex" gap={2}>
              <NumberInput source="withdrawMin" label="최소환전액" />
              <NumberInput source="withdrawMax" label="최대환전액" />
              <NumberInput source="withdrawFee" label="환전수수료율(%)" />
            </Box>
            <NumberInput source="withdrawFeeFixed" label="환전고정수수료" />
          </Box>
        </FormTab>

        <FormTab label="게임시스템">
          <Box display="flex" flexDirection="column" gap={2}>
            <BooleanInput source="allowGame" label="게임시스템 활성화" />
            <Box display="flex" gap={2}>
              <NumberInput source="bettingTime" label="베팅시간(초)" />
              <NumberInput source="resultTime" label="결과시간(초)" />
              <NumberInput source="disableTime" label="게임간격(초)" />
            </Box>
            <Box display="flex" gap={2}>
              <NumberInput source="bettingMin" label="최소베팅액" />
              <NumberInput source="bettingMax" label="최대베팅액" />
            </Box>
            <Box display="flex" gap={2}>
              <NumberInput source="oddsBS" label="대소배율" />
              <NumberInput source="oddsOE" label="홀짝배율" />
            </Box>
          </Box>
        </FormTab>

        <FormTab label="은행계좌">
          <TextInput source="bankName" label="은행명" fullWidth />
          <TextInput source="accountNumber" label="계좌번호" fullWidth />
          <TextInput source="accountHolder" label="예금주" fullWidth />
        </FormTab>

        <FormTab label="가입코드">
          <TextInput source="inviteCode" label="가입코드" fullWidth />
          <NumberInput source="inviteBonus" label="가입축하 포인트" />
        </FormTab>
      </TabbedForm>
    </div>
  );
};

export default SettingsPage;
