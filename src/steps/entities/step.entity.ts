import { Service } from 'src/service/entities/service.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  createdAt: Date;

  @ManyToMany(() => Service, service => service.steps)
  @JoinTable({ name: 'services_steps' })
  services: Service[];

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }
}
