import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const newSubscription = this.subscriptionRepository.create(createSubscriptionDto);
    return await this.subscriptionRepository.save(newSubscription);
  }

  findAll() {
    return this.subscriptionRepository.find();
  }

  async findOne(id: number) {
    const foundSubscription = await this.subscriptionRepository.findOneBy({ id });
    if (!foundSubscription) {
      throw new NotFoundException('Subscription not found');
    }
    return foundSubscription;
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const foundSubscription = await this.subscriptionRepository.findOneBy({ id });
    if (!foundSubscription) {
      throw new NotFoundException('Subscription not found');
    }
    const updatedSubscription = this.subscriptionRepository.merge(
      foundSubscription,
      updateSubscriptionDto,
    );
    return this.subscriptionRepository.save(updatedSubscription);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} subscription`;
  // }
}
