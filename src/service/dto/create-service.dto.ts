import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ServiceType } from '../entities/service.entity';

export class CreateServiceDto {
  constructor(partial: Partial<CreateServiceDto>) {
    Object.assign(this, partial);
  }
  @IsNotEmpty()
  @IsEnum(ServiceType)
  type: ServiceType;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
