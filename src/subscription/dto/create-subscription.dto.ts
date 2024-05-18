import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsBoolean()
  active: boolean;

  @IsDate()
  expiresAt: Date;

  @IsNotEmpty()
  @IsNumber()
  levelId: number;
}
