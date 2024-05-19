import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private readonly carRepository: Repository<Car>) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(createCarDto);
    return await this.carRepository.save(newCar);
  }

  findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['user', 'subscription', 'events'],
    });

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return car;
  }

  findAllByUserId(userId: number): Promise<Car[]> {
    return this.carRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'subscription', 'events'],
    });
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findOne(id);

    const updatedCar = this.carRepository.create({
      ...car,
      ...updateCarDto,
    });

    return await this.carRepository.save(updatedCar);
  }

  async remove(id: number): Promise<DeleteResult> {
    const foundCar = await this.carRepository.findOneBy({ id });
    if (!foundCar) {
      throw new NotFoundException('Car not found');
    }
    return this.carRepository.delete(id);
  }
}
