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

  @Column({ type: 'int', default: 0 })
  payout: number;

  @Column({ type: 'varchar' })
  betType: string;

  @Column({ type: 'varchar', default: 'pending' })
  result: 'win' | 'lose' | 'pending';

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'cancelled' | 'resolved';

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
