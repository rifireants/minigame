import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from 'react-admin';

export const BetEdit = () => (
  <Edit title="베팅 수정">
    <SimpleForm>
      <TextInput source="id" label="베팅 아이디" disabled />
      <TextInput source="user.userid" label="회원 아이디" disabled />
      <TextInput source="round.round" label="라운드 번호" disabled />
      <NumberInput source="amount" label="베팅금액" />
      <NumberInput source="payout" label="당첨금" disabled/>
      <TextInput source="betType" label="베팅종류" disabled />
      <TextInput source="result" label="결과" disabled />
      <DateInput source="createdAt" label="일시" disabled />
    </SimpleForm>
  </Edit>
);

export default BetEdit;
