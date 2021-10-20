import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  arrivalDate: Date;

  @Column()
  purchaseUrl: string;

  @Column()
  rating: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;
}
