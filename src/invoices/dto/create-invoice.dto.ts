import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateInvoiceDto {
  @IsNumber()
  @IsOptional()
  subscriptionId: number;

  @IsNumber()
  @IsNotEmpty()
  eventId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  constructor(partial: Partial<CreateInvoiceDto>) {
    Object.assign(this, partial);
  }
}
