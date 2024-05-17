import { Event } from 'src/event/entities/event.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subscription, subscription => subscription.invoices, { nullable: true })
  subscription: Subscription;

  @ManyToOne(() => Event, event => event.invoices, { nullable: true })
  event: Event;

  @Column()
  amount: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  addUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  validate() {
    if (!this.subscription && !this.event) {
      throw new Error('Subscription and Event cannot be null at the same time');
    }
  }
}
