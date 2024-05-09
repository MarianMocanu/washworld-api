import { IsString, IsNotEmpty, IsEmail, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { Car } from 'src/car/entities/car.entity';
import { Role } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    isActive?: boolean,
    role?: Role,
    cars?: Car[],
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.role = role;
    this.cars = cars;
  }
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsOptional()
  cars: Car[];
}
