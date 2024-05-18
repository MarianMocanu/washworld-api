import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStepDto {
  constructor(name: string, order: number, description: string) {
    this.name = name;
    this.order = order;
    this.description = description;
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

  @IsDefined()
  @IsNumber()
  duration: number;
}
