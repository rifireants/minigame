import { IsEnum, IsInt, Min } from 'class-validator';

export class PlaceBetDto {
  @IsInt()
  roundId: number;

  @IsInt()
  @Min(1000)
  amount: number;

  @IsEnum(['big', 'small'])
  highLow?: 'big' | 'small';

  @IsEnum(['odd', 'even'])
  oddEven?: 'odd' | 'even';
}