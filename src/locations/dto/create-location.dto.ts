import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import { Status } from '../entities/location.entity';

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
  constructor(partial: Partial<CreateLocationDto>) {
    Object.assign(this, partial);
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
  status: Status;

  @IsOptional()
  @IsString()
  image: string;

  @IsDefined()
  coordinates: {
    latitude: number;
    longitude: number;
  };

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }

  createdAt: Date;
}
