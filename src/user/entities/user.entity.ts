import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Car } from 'src/car/entities/car.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column()
  createdAt: Date;

  @OneToMany(() => Car, car => car.user, { nullable: false })
  cars: Car[];

  @BeforeInsert()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @BeforeInsert()
  setCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  normalizeFirstName(): void {
    const name = this.firstName.trim();
    this.firstName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  @BeforeInsert()
  normalizeLastName(): void {
    const name = this.lastName.trim();
    this.lastName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
