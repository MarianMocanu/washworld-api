import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const level = await this.levelRepository.findOne({
      where: { id: createSubscriptionDto.levelId },
    });
    if (!level) {
      throw new NotFoundException('Level not found');
    }
    const newSubscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      level,
    });
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

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const foundSubscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['level'],
    });
    if (!foundSubscription) {
      throw new NotFoundException('Subscription not found');
    }
    const level = await this.levelRepository.findOne({
      where: { id: updateSubscriptionDto.levelId },
    });
    if (!level) {
      throw new NotFoundException('Level not found');
    }
    const updatedSubscription = this.subscriptionRepository.merge(foundSubscription, {
      ...updateSubscriptionDto,
      level,
    });
    return this.subscriptionRepository.save(updatedSubscription);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} subscription`;
  // }
}
