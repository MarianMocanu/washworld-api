import { IsNotEmpty, IsNumber } from 'class-validator';

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

  constructor(carId: number, serviceId: number, terminalId: number) {
    this.carId = carId;
    this.serviceId = serviceId;
    this.terminalId = terminalId;
  }
}
