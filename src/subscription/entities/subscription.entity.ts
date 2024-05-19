import { Car } from 'src/car/entities/car.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Level } from 'src/levels/entities/level.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @Column()
  expiresAt: Date;

  @OneToOne(() => Car, { nullable: false })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @OneToOne(() => Level, { nullable: false })
  @JoinColumn({ name: 'levelId' })
  level: Level;

  @OneToMany(() => Invoice, invoice => invoice.subscription)
  invoices: Invoice[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  @BeforeInsert()
  addUpdatedAt() {
    this.updatedAt = new Date();
  }
}
