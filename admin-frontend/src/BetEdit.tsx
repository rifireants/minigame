import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from 'react-admin';

export const BetEdit = () => (
  <Edit title="resources.bets.name">
    <SimpleForm>
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
