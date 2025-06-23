import {
  List,
  Datagrid,
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
      clickable={false}
    />
  );
};

const ApproveRejectButtons = ({ record }: { record: any }) => {
  const [update] = useUpdate();
  const notify = useNotify();

  if (!record || record.status !== 'pending') return null;

  const handleAction = (newStatus: 'approved' | 'rejected') => {
    update(
      'withdrawals',
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

const WithdrawalList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <List>
      {isSmall ? null : (
        <Datagrid>
          <FunctionField label="회원" render={record => record?.user?.userid ?? '-'} />
          <NumberField source="amount" label="금액" />
          <FunctionField label="은행" render={record => record?.bankName ?? '-'} />
          <FunctionField label="계좌번호" render={record => record?.accountNumber ?? '-'} />
          <FunctionField label="예금주" render={record => record?.accountHolder ?? '-'} />
          <DateField source="createdAt" label="신청일" showTime />
          <FunctionField
            label="상태"
            render={record =>
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

export default WithdrawalList;
