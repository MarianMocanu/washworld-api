import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Repository } from 'typeorm';
import { CarService } from 'src/car/car.service';
import { LevelsService } from 'src/levels/levels.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly levelService: LevelsService,
    private readonly carService: CarService,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const level = await this.levelService.findOne(createSubscriptionDto.levelId);
    if (!level) {
      throw new NotFoundException('Level not found');
    }

    const car = await this.carService.findOne(createSubscriptionDto.carId);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const newSubscription = this.subscriptionRepository.create(createSubscriptionDto);
    newSubscription.level = level;
    newSubscription.car = car;
    return await this.subscriptionRepository.save(newSubscription);
  }

  findAll() {
    return this.subscriptionRepository.find({ relations: ['level'] });
  }

  async findOne(id: number) {
    const foundSubscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['level'],
    });
    if (!foundSubscription) {
      throw new NotFoundException('Subscription not found');
    }
    return foundSubscription;
  }

  async findOneByUserId(userId: number) {
    const foundSubscription = await this.subscriptionRepository.findOne({
      where: { car: { user: { id: userId } } },
      relations: ['level', 'level.services', 'car', 'car.user'],
    });
    return foundSubscription;
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const foundSubscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['level', 'car'],
    });
    if (!foundSubscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (updateSubscriptionDto.levelId) {
      const level = await this.levelService.findOne(updateSubscriptionDto.levelId);
      if (!level) {
        throw new NotFoundException('Level not found');
      }
      foundSubscription.level = level;
    }

    if (updateSubscriptionDto.carId) {
      const car = await this.carService.findOne(updateSubscriptionDto.carId);
      if (!car) {
        throw new NotFoundException('Car not found');
      }
      foundSubscription.car = car;
    }

    if (updateSubscriptionDto.active !== undefined) {
      foundSubscription.active = updateSubscriptionDto.active;
    }

    if (updateSubscriptionDto.expiresAt) {
      foundSubscription.expiresAt = updateSubscriptionDto.expiresAt;
    }
    return this.subscriptionRepository.save(foundSubscription);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} subscription`;
  // }
}
