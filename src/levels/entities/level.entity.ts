import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }
}
