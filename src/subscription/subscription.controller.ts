import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateId(id);
    return this.subscriptionService.findOne(+id);
  }

  @Get('/user/:userId')
  findSubscriptionsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionService.findAllByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    this.validateId(id);
    return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  validateId(id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Id is not a number');
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.subscriptionService.remove(+id);
  // }
}
