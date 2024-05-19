import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ServiceType } from '../entities/service.entity';

export class CreateServiceDto {
  constructor(type: ServiceType, price: number) {
    this.type = type;
    this.price = price;
  }
  @IsNotEmpty()
  @IsEnum(ServiceType)
  type: ServiceType;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
