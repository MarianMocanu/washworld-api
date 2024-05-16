import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateLocationDto } from './dto/create-location.dto';
// import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

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
