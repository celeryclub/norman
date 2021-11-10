import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Coffee } from './Coffee';

@Entity('roasts')
export class Roast {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coffee, (coffee) => coffee.roasts, { nullable: false })
  coffee: Coffee;

  // It seems like this column shouldn't be needed, but it is.
  // https://github.com/typeorm/typeorm/issues/586#issuecomment-318537426
  @Column()
  coffeeId: number;

  @Column({ type: 'date' })
  date: Date;

  // In grams
  @Column()
  batchSize: number;

  @Column()
  roasterSettings: string;

  // All times in seconds
  @Column()
  preheatTime: number;

  @Column()
  firstCrackStartTime: number;

  @Column()
  totalRoastTime: number;

  @Column({
    nullable: true,
  })
  firstCrackEndTime: number;

  // In Fahrenheit
  @Column({
    nullable: true,
  })
  ambientTemperature: number;

  // City, Full City, etc.
  @Column({
    nullable: true,
  })
  roastLevel: string;

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
}
