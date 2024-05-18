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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateServiceId(id);
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    this.validateServiceId(id);
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.validateServiceId(id);
    return this.serviceService.remove(+id);
  }

  validateServiceId(id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Service ID is not a number');
    }
  }
}
