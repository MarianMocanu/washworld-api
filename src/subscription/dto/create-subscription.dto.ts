import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  levelId: number;

  @IsNotEmpty()
  @IsNumber()
  carId: number;
}
