import { Event } from 'src/event/entities/event.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Service } from 'src/service/entities/service.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

export enum TerminalType {
  automatic = 'automatic',
  manual = 'maual',
}

@Entity()
export class Terminal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TerminalStatus, default: TerminalStatus.idle })
  status: TerminalStatus;

  @Column()
  locationId: number;

  @ManyToOne(() => Location, location => location.terminals, { nullable: false })
  location: Location;

  @OneToMany(() => Event, event => event.terminal)
  events: Event[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany(() => Service, service => service.terminals)
  @JoinTable({ name: 'services_terminals' })
  services: Service[];

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  addUpdatedAt() {
    this.updatedAt = new Date();
  }
}
