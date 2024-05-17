import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsNumber()
  @IsNotEmpty()
  terminalId: number;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  constructor(partial: Partial<CreateEventDto>) {
    Object.assign(this, partial);
  }
}
