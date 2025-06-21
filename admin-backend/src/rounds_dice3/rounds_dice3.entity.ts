export class Rounds_Dice3 {
  id: number;
  round: number;
  startTime: Date;
  dice1: number;
  dice2: number;
  dice3: number;
  sum: number;
  memo: string;
  participants: number;
  totalBet: number;
  status: 'created' | 'started' | 'ended' | 'canceled';
  createdAt: Date;
}
