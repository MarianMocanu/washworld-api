import { IsString, IsNotEmpty, IsEmail, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { Car } from 'src/car/entities/car.entity';
import { User, Role } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(user: User) {
    super();
    this.role = user.role;
    this.cars = user.cars;
  }
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsOptional()
  cars: Car[];
}
