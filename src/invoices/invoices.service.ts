import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const newInvoice = this.invoiceRepository.create(createInvoiceDto);
    return await this.invoiceRepository.save(newInvoice);
  }

  findAll() {
    return this.invoiceRepository.find();
  }

  async findOne(id: number) {
    const foundInvoice = await this.invoiceRepository.findOneBy({ id });
    if (!foundInvoice) {
      throw new NotFoundException('Invoice not found');
    }
    return foundInvoice;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const foundInvoice = await this.invoiceRepository.findOneBy({ id });
    if (!foundInvoice) {
      throw new NotFoundException('Invoice not found');
    }
    const updatedInvoice = this.invoiceRepository.create({ ...foundInvoice, ...updateInvoiceDto });
    return this.invoiceRepository.save(updatedInvoice);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} invoice`;
  // }
}
