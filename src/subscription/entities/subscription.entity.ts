import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Level } from 'src/levels/entities/level.entity';
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
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => Level, level => level.subscriptions, { nullable: false })
  level: Level;

  @OneToMany(() => Invoice, invoice => invoice.subscription, { nullable: false })
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
  addUpdatedAt() {
    this.updatedAt = new Date();
  }
}
