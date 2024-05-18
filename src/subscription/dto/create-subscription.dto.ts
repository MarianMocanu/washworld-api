import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsBoolean()
  active: boolean;

  @IsDateString()
  expiresAt: Date;

  @IsNotEmpty()
  @IsNumber()
  levelId: number;
}
