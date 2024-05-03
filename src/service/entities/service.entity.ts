import { Step } from 'src/steps/entities/step.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }

  @ManyToMany(() => Step)
  @JoinTable({ name: 'services_steps' })
  steps: Step[];
}
