import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  FunctionField,
  useUpdate,
  Button,
  useNotify,
} from 'react-admin';
import { useMediaQuery, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const StatusChip = ({ status }: { status?: string }) => {
  const color =
    status === 'approved' ? 'success'
      : status === 'rejected' ? 'error'
        : 'warning';

  return (
    <Chip
      label={status ?? 'unknown'}
      color={color}
      size="small"
      onClick={() => { }} // ✅ 클릭 방지
    />
  );
};

const ApproveRejectButtons = ({ record }: { record: any }) => {
  const [update] = useUpdate();
  const notify = useNotify();

  if (!record || record.status !== 'pending') return null; // ✅ 조건 렌더링 추가

  const handleAction = (newStatus: 'approved' | 'rejected') => {
    update(
      'deposits',
      { id: record.id, data: { status: newStatus }, previousData: record },
      {
        onSuccess: () => notify(`${newStatus === 'approved' ? '승인' : '거부'} 완료`),
        onError: () => notify('처리 실패', { type: 'error' }),
      }
    );
  };

  return (
    <>
      <Button onClick={() => handleAction('approved')} size="small">
        <CheckIcon fontSize="small" style={{ marginRight: 4 }} />
        승인
      </Button>
      <Button onClick={() => handleAction('rejected')} size="small">
        <CloseIcon fontSize="small" style={{ marginRight: 4 }} />
        거부
      </Button>
    </>
  );
};

const DepositList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <List>
      {isSmall ? null : (
        <Datagrid rowClick={false}>
          <TextField source="user.userid" label="회원" />
          <NumberField source="amount" label="금액" />
          <TextField source="accountHolder" label="입금자명" />
          <DateField source="createdAt" label="신청일" showTime />
          <FunctionField
            label="상태"
            render={(record) =>
              record?.status ? <StatusChip status={record.status} /> : null
            }
          />
          <FunctionField
            label="처리"
            render={record => <ApproveRejectButtons record={record} />}
          />
        </Datagrid>
      )}
    </List>
  );
};

export default DepositList;
