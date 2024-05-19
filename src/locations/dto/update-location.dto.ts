import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LocationStatus } from '../entities/location.entity';

interface Period {
  from: string;
  to: string;
}

interface OpeningHours {
  monday: Period;
  tuesday: Period;
  wednesday: Period;
  thursday: Period;
  friday: Period;
  saturday: Period;
  sunday: Period;
}

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsOptional()
  openingHours: OpeningHours;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status: LocationStatus;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
