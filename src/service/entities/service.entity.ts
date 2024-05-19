import { Event } from 'src/event/entities/event.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ServiceType {
  auto = 'auto',
  self = 'self',
  vacuum = 'vacuum',
}

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ServiceType })
  type: ServiceType;

  @Column()
  price: number;

  @OneToMany(() => Event, event => event.service)
  events: Event[];

  @ManyToMany(() => Step, step => step.services)
  @JoinTable({ name: 'services_steps' })
  steps: Step[];

  @ManyToMany(() => Level, level => level.services)
  @JoinTable({ name: 'services_levels' })
  levels: Level[];

  @ManyToMany(() => Terminal, terminal => terminal.services)
  @JoinTable({ name: 'services_terminals' })
  terminals: Terminal[];

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  addUpdatedAt() {
    this.updatedAt = new Date();
  }
}
