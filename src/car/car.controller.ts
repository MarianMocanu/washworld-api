import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateSubscriptionId(id);
    return this.carService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.carService.findAllByUserId(+userId);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.validateSubscriptionId(id);
    return this.carService.remove(+id);
  }
}
