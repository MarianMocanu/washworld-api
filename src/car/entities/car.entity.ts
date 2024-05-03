import { Event } from 'src/event/entities/event.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @ManyToOne(() => User, user => user.cars, { nullable: false })
  user: User;

  @OneToOne(() => Subscription, { nullable: true })
  @JoinColumn()
  subscription: Subscription;

  @OneToMany(() => Event, event => event.car, { nullable: false })
  events: Event[];

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
