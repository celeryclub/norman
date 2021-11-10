import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Roast } from './Roast';

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  regions: string;

  @Column()
  producer: string;

  @Column()
  cultivar: string;

  @Column()
  process: string;

  @Column()
  decaf: boolean;

  @Column()
  grade: string;

  @Column({ type: 'date' })
  arrivalDate: Date;

  @Column()
  purchaseUrl: string;

  @Column({
    nullable: true,
  })
  sentiment: boolean;

  @Column({
    nullable: true,
  })
  rating: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;

  @OneToMany(() => Roast, (roast) => roast.coffee)
  roasts: Roast[];
}
