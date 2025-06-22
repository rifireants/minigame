import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rounds_dice3')
export class Rounds_Dice3 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  round: number;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @Column()
  dice1: number;

  @Column()
  dice2: number;

  @Column()
  dice3: number;

  @Column()
  sum: number;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @Column()
  participants: number;

  @Column({ name: 'totalBet' })
  totalBet: number;

  @Column({ type: 'varchar' })
  status: 'created' | 'started' | 'ended' | 'canceled';

  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
