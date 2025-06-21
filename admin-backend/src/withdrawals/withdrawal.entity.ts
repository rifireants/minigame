// withdrawal.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' }) // 외래키로 명시
  user: User;

  @Column()
  amount: number;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  accountHolder: string;

  @Column({ type: 'varchar' })
  status: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
