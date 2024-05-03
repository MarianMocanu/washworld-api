import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
