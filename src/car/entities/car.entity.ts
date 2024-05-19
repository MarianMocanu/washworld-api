import { Event } from 'src/event/entities/event.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';
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
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @ManyToOne(() => User, user => user.cars, { nullable: false })
  user: User;

  @OneToMany(() => Event, event => event.car)
  events: Event[];

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }
  @Column()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  addUpdatedAt() {
    this.updatedAt = new Date();
  }
}
