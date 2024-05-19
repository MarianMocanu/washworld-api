import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @OneToMany(() => Car, car => car.user)
  cars: Car[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @Column()
  createdAt: Date;

  @BeforeInsert()
  setCreatedAt(): void {
    this.createdAt = new Date();
  }

  @Column()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  @BeforeInsert()
  normalizeFirstName(): void {
    const name = this.firstName.trim();
    const names = name.split(' ');
    names.forEach((name, index) => {
      names[index] = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });
    this.firstName = names.join(' ');
  }

  @BeforeUpdate()
  @BeforeInsert()
  normalizeLastName(): void {
    const name = this.lastName.trim();
    const names = name.split(' ');
    names.forEach((name, index) => {
      names[index] = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });
    this.lastName = names.join(' ');
  }
  @BeforeUpdate()
  @BeforeInsert()
  normalizeEmail(): void {
    const email = this.email.trim();
    this.email = email.toLowerCase();
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
