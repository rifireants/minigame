import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Deposit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  amount: number;

  @Column()
  accountHolder: string;

  @Column({ type: 'varchar' })
  status: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
