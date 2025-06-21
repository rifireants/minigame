import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

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
