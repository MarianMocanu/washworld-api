import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  plateNumber: string;

  @IsNotEmpty()
  userId: number;

  @IsOptional()
  subscriptionId: number;
}
