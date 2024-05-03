import { Event } from 'src/event/entities/event.entity';
import { Location } from 'src/location/entities/location.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TerminalStatus {
  idle = 'idle',
  busy = 'busy',
  maintenance = 'maintenance',
  closed = 'closed',
}

@Entity()
export class Terminal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TerminalStatus, default: TerminalStatus.idle })
  status: TerminalStatus;

  @ManyToOne(() => Location, location => location.terminals, { nullable: false })
  location: Location;

  @OneToMany(() => Event, event => event.terminal)
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
