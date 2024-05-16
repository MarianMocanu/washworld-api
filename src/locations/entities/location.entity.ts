import { Terminal } from 'src/terminal/entities/terminal.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  available = 'available',
  maintenance = 'maintenance',
  closed = 'closed',
}

interface Period {
  from: string;
  to: string;
}

interface OpeningHours {
  monday: Period;
  tuesday: Period;
  wednesday: Period;
  thursday: Period;
  friday: Period;
  saturday: Period;
  sunday: Period;
}

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  streetName: string;

  @Column()
  streetNumber: string;

  @Column()
  postalCode: string;

  @Column({ type: 'json' })
  openingHours: OpeningHours;

  @Column({ type: 'enum', enum: Status, default: Status.available })
  status: Status;

  @Column()
  image: string;

  @Column({ type: 'json' })
  coordinates: {
    latitude: number;
    longitude: number;
  };

  @Column()
  createdAt: Date;

  @OneToMany(() => Terminal, terminal => terminal.location)
  terminals: Terminal[];

  @BeforeInsert()
  addCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  addAddressString(): void {
    this.address = `${this.postalCode} ${this.city}, ${this.streetName} ${this.streetNumber}`;
  }
}
