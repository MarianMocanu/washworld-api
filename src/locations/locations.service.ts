import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateLocationDto } from './dto/create-location.dto';
// import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { getDistanceFromLatLonInKm } from 'src/utils/distance.calculator';
import { ExtendedLocation } from './entities/extended-location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const newLocation = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(newLocation);
  }

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async findAllClosest(latitude: number, longitude: number): Promise<ExtendedLocation[]> {
    const locations = await this.locationRepository.find();
    const locationsWithDistance = locations.map(
      location =>
        ({
          ...location,
          distance: getDistanceFromLatLonInKm(
            latitude,
            longitude,
            location.coordinates.latitude,
            location.coordinates.longitude,
          ),
        }) as ExtendedLocation,
    );
    return locationsWithDistance.sort((a, b) => a.distance - b.distance);
  }

  async findOne(id: number): Promise<Location> {
    const foundLocation = await this.locationRepository.findOneBy({ id });
    if (!foundLocation) {
      throw new NotFoundException('Location not found');
    }
    return foundLocation;
  }

  // update(id: number, updateLocationDto: UpdateLocationDto) {
  //   return `This action updates a #${id} location`;
  // }

  async remove(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }
}
