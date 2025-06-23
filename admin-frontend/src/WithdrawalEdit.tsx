import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  SelectInput,
} from 'react-admin';

const statusChoices = [
  { id: 'pending', name: '대기중' },
  { id: 'approved', name: '승인' },
  { id: 'rejected', name: '거부' },
];

const WithdrawalEdit = () => (
  <Edit title="출금 요청 수정">
    <SimpleForm>
      <TextInput source="id" label="출금 ID" disabled />
      <TextInput source="user.userid" label="회원 아이디" disabled />
      <NumberInput source="amount" label="금액" disabled />
      <TextInput source="bankName" label="은행" />
      <TextInput source="accountNumber" label="계좌번호" />
      <TextInput source="accountHolder" label="예금주" />
      <SelectInput source="status" label="상태" choices={statusChoices} disabled />
      <DateInput source="createdAt" label="신청일" disabled />
    </SimpleForm>
  </Edit>
);

export default WithdrawalEdit;
