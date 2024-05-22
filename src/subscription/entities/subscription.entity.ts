import { Car } from 'src/car/entities/car.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Level } from 'src/levels/entities/level.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Car, { nullable: false })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @ManyToOne(() => Level, { nullable: false })
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

  @BeforeInsert()
  setExpiresAt() {
    const now = new Date();
    this.expiresAt = new Date(now.setMonth(now.getMonth() + 1));
  }

  @BeforeInsert()
  setActive() {
    this.active = true;
  }

  @BeforeUpdate()
  @BeforeInsert()
  addUpdatedAt() {
    this.updatedAt = new Date();
  }
}
