// 상단 import 수정
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from 'react-admin';
import { useWatch, useFormContext } from 'react-hook-form'; // ✅ 여기서 가져와야 함
import { useEffect } from 'react';

const PayoutAutoUpdater = () => {
  const amount = useWatch({ name: 'amount' }); // amount 변경 감지
  const { setValue } = useFormContext();

  useEffect(() => {
    if (typeof amount === 'number') {
      const payout = Math.floor(amount * 2); // 예: 2배로 계산 (필요 시 비율 조정)
      setValue('payout', payout);
    }
  }, [amount, setValue]);

  return null; // 렌더링은 하지 않음
};

export const BetEdit = () => (
  <Edit title="resources.bets.name">
    <SimpleForm>
      <PayoutAutoUpdater />

      <TextInput source="id" label="resources.bets.fields.id" disabled />
      <TextInput source="user.userid" label="resources.bets.fields.userId" disabled />
      <TextInput source="round.round" label="resources.bets.fields.round" disabled />

      <NumberInput source="amount" label="resources.bets.fields.amount" />
      <NumberInput source="payout" label="resources.bets.fields.payout" disabled />

      <TextInput source="betType" label="resources.bets.fields.betType" />
      <TextInput source="result" label="resources.bets.fields.result" disabled />
      <DateInput source="createdAt" label="resources.bets.fields.createdAt" disabled />
    </SimpleForm>
  </Edit>
);

export default BetEdit;
