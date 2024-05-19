import { Car } from 'src/car/entities/car.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Service } from 'src/service/entities/service.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, car => car.events, { nullable: false })
  car: Car;

  @ManyToOne(() => Service, service => service.events, { nullable: false })
  service: Service;

  @ManyToOne(() => Terminal, terminal => terminal.events, { nullable: false })
  terminal: Terminal;

  @OneToMany(() => Invoice, invoice => invoice.event)
  invoices: Invoice[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  addUpdatedAt() {
    this.updatedAt = new Date();
  }
}
