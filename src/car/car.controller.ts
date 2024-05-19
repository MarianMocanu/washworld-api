import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateSubscriptionId(id);
    return this.carService.findOne(+id);
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.carService.findAllByUserId(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    this.validateSubscriptionId(id);
    return this.carService.update(+id, updateCarDto);
  }

  validateSubscriptionId(id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Subscription id is not a number');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.validateSubscriptionId(id);
    return this.carService.remove(+id);
  }
}
