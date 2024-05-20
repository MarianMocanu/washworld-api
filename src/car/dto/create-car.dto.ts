import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  plateNumber: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
