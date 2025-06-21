export class Withdrawal {
  id: number;
  userId: number;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}