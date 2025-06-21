import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rounds_Dice3 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  round: number;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column()
  dice1: number;

  @Column()
  dice2: number;

  @Column()
  dice3: number;

  @Column()
  sum: number;

  @Column()
  memo: string;

  @Column()
  participants: number;

  @Column()
  totalBet: number;

  @Column({ type: 'varchar' })
  status: 'created' | 'started' | 'ended' | 'canceled';

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
