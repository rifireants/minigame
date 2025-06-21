import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Rounds_Dice3 } from '../rounds_dice3/rounds_dice3.entity';
import { ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  roundId: number;

  @ManyToOne(() => Rounds_Dice3)
  @JoinColumn({ name: 'roundId' })
  round: Rounds_Dice3;

  @Column()
  amount: number;

  @Column()
  payout: number;

  @Column({ type: 'varchar' })
  betType: 'odd' | 'even' | 'big' | 'small';

  @Column({ type: 'varchar' })
  result: 'win' | 'lose' | 'pending';

  @Column({ type: 'varchar' })
  status: 'active' | 'cancelled';

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
