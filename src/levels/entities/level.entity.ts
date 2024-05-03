import { Subscription } from 'src/subscription/entities/subscription.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Subscription, subscription => subscription.level, { nullable: false })
  subscriptions: Subscription[];

  @Column()
  createdAt: Date;

  @BeforeInsert()
  addCreatedAt() {
    this.createdAt = new Date();
  }
}
