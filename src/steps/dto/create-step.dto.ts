import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class CreateStepDto {
  constructor(name: string, order: number, description: string) {
    this.name = name;
    this.order = order;
    this.description = description;
    this.createdAt = new Date();
  }

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsDefined()
  @IsString()
  @IsOptional()
  description: string;

  createdAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }
}
