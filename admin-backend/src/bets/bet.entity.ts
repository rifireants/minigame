export class Bet {
  id: number;
  userId: number;
  amount: number;
  payout: number;
  betType: 'odd' | 'even' | 'big' | 'small';
  result: 'win' | 'lose' | 'pending';
  status: 'active' | 'cancelled';
  createdAt: Date;
}
