import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';
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

export class CreateLocationDto {
  constructor(
    city: string,
    streetName: string,
    streetNumber: string,
    postalCode: string,
    openingHours: OpeningHours,
    status: LocationStatus,
    image: string,
    coordinates: { latitude: number; longitude: number },
  ) {
    this.city = city;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.postalCode = postalCode;
    this.openingHours = openingHours;
    this.status = status;
    this.image = image;
    this.coordinates = coordinates;
  }

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsDefined()
  openingHours: OpeningHours;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  status: LocationStatus;

  @IsOptional()
  @IsString()
  image: string;

  @IsDefined()
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
