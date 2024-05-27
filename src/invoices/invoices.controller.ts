import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateInvoiceId(id);
    return this.invoicesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    this.validateInvoiceId(id);
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invoicesService.remove(+id);
  // }
  validateInvoiceId(id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Invoice id is not a number');
    }
  }
}
