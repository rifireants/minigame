import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Setting {
  @PrimaryColumn()
  id: string; // 싱글톤 설정 ID

  @Column()
  allowTransaction: boolean;

  @Column()
  autoAmount: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  depositMin: number;

  @Column()
  depositMax: number;

  @Column()
  depositFee: number;

  @Column()
  withdrawMin: number;

  @Column()
  withdrawMax: number;

  @Column()
  withdrawFee: number;

  @Column()
  withdrawFeeFixed: number;

  @Column()
  bettingTime: number;

  @Column()
  resultTime: number;

  @Column()
  disableTime: number;

  @Column()
  bettingMin: number;

  @Column()
  bettingMax: number;

  @Column()
  oddsBS: number;

  @Column()
  oddsOE: number;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  accountHodler: string;

  @Column()
  inviteCode: string;

  @Column()
  inviteBonus: number;
}
