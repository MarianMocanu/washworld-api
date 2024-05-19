import { Service } from 'src/service/entities/service.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
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

  @ManyToMany(() => Service, service => service.steps)
  services: Service[];

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
