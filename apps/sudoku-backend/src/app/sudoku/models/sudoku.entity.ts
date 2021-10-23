import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SudokuEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
