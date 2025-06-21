// UserEdit.tsx
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  useNotify,
  useRedirect,
  useUpdate,
} from 'react-admin';

const UserEdit = () => {
  const [update] = useUpdate();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (data: any) => {
    const submitData = { ...data };
    if (!submitData.password) {
      delete submitData.password; // 비밀번호 입력 없으면 제거
    }

    try {
      await update('users', { id: data.id, data: submitData });
      notify('수정 완료');
      redirect('list', 'users');
    } catch (error) {
      notify('수정 실패', { type: 'error' });
    }
  };

  return (
    <Edit>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="userid" label="아이디" disabled />
        <TextInput source="username" label="이름" />
        <TextInput source="password" label="새 비밀번호 (입력 시에만 변경)" type="password" />
        <NumberInput source="point" label="포인트" />
        <TextInput source="bankName" label="은행" />
        <TextInput source="accountNumber" label="계좌번호" />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
