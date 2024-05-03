import { Event } from 'src/event/entities/event.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import {
  BeforeInsert,
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

  @ManyToMany(() => Step)
  @JoinTable({ name: 'services_steps' })
  steps: Step[];

  @ManyToMany(() => Level)
  @JoinTable({ name: 'services_levels' })
  levels: Level[];

  @ManyToMany(() => Terminal)
  @JoinTable({ name: 'services_terminals' })
  terminals: Terminal[];

  @OneToMany(() => Event, event => event.service, { nullable: false })
  events: Event[];

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }
}
