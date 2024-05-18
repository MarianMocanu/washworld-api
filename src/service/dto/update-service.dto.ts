import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { ServiceType } from '../entities/service.entity';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  constructor(type: ServiceType, price: number) {
    super();
    this.type = type;
    this.price = price;
  }
}
