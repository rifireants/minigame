export class Deposit {
  id: number;
  userId: number;
  amount: number;
  accountHolder: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
