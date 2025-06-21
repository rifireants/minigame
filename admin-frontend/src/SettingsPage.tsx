import { Box } from '@mui/material';
import {
  TextInput,
  NumberInput,
  BooleanInput,
  TimeInput,
  useGetOne,
  useUpdate,
  useNotify,
  TabbedForm,
  FormTab,
  Title,
  Toolbar,
  SaveButton,
} from 'react-admin';

const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const SettingsPage = () => {
  const notify = useNotify();
  const { data, isLoading } = useGetOne('settings', { id: 'singleton' });
  const [update] = useUpdate('settings');

  if (isLoading || !data) return <>Loading...</>;

  const handleSave = async (values: any) => {
    try {
      await update('settings', {
        id: 'singleton',
        data: values,
        previousData: data,
      });
      notify('설정이 저장되었습니다', { type: 'success' });
    } catch (error) {
      notify('저장 중 오류가 발생했습니다', { type: 'error' });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Title title="전체 설정" />
      <TabbedForm defaultValues={data} onSubmit={handleSave} toolbar={<CustomToolbar />}>
        <FormTab label="충전/환전">
          <Box width="100%" display="flex" flexDirection="column" gap={2}>
            <BooleanInput source="allowTransaction" label="충환전시스템 활성화" />
            <NumberInput source="autoAmount" label="자동승인한도" />
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
              <Box flex={1}>
                <TimeInput source="startTime" label="시작시간" fullWidth />
              </Box>
              <Box flex={1}>
                <TimeInput source="endTime" label="끝시간" fullWidth />
              </Box>
            </Box>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
              <Box flex={1}>
                <NumberInput source="depositMin" label="최소충전액" />
              </Box>
              <Box flex={1}>
                <NumberInput source="depositMax" label="최대충전액" />
              </Box>
              <Box flex={1}>
                <NumberInput source="depositFee" label="충전수수료율(%)" />
              </Box>
            </Box>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
              <Box flex={1}>
                <NumberInput source="withdrawMin" label="최소환전액" />
              </Box>
              <Box flex={1}>
                <NumberInput source="withdrawMax" label="최대환전액" />
              </Box>
              <Box flex={1}>
                <NumberInput source="withdrawFee1" label="환전수수료율(%)" />
              </Box>
            </Box>
            <NumberInput source="withdrawFee1" label="환전고정수수료" />
          </Box>
        </FormTab>
        <FormTab label="게임시스템">
          <Box width="100%" display="flex" flexDirection="column" gap={2}>
            <BooleanInput source="allowTransaction" label="게임시스템 활성화" />
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
              <Box flex={1}>
                <NumberInput source="bettingTime" label="베팅시간(초)" />
              </Box>
              <Box flex={1}>
                <NumberInput source="resultTime" label="결과시간(초)" />
              </Box>
              <Box flex={1}>
                <NumberInput source="disableTime" label="게임간격(초)" />
              </Box>
            </Box>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
              <Box flex={1}>
                <NumberInput source="bettingMin" label="최소베팅액" />
              </Box>
              <Box flex={1}>
                <NumberInput source="bettingMax" label="최대베팅액" />
              </Box>
            </Box>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
              <Box flex={1}>
                <NumberInput source="oddsBS" label="대소배율" />
              </Box>
              <Box flex={1}>
                <NumberInput source="oddsOE" label="홀짝배율" />
              </Box>
            </Box>
          </Box>
        </FormTab>
        <FormTab label="은행계좌">
          <TextInput source="bankName" label="은행명" />
          <TextInput source="accountNumber" label="계좌번호" />
          <TextInput source="accountHolder" label="예금주" />
        </FormTab>
        <FormTab label="가입코드">
          <TextInput source="inviteCode" label="가입코드" />
          <NumberInput source="signupBonus" label="가입축하 포인트" />
          <BooleanInput source="allowSignup" label="회원가입 허용" />
        </FormTab>
      </TabbedForm>
    </div>
  );
};

export default SettingsPage;
