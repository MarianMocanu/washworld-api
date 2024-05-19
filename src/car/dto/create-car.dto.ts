import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  plateNumber: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
