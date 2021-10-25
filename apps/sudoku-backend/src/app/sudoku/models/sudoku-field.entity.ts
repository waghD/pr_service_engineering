import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SudokuEntity } from './sudoku.entity';

@Entity()
export class SudokuFieldEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y:number;

  @Column()
  value:number;

  @Column()
  solution:number;

  @ManyToOne(type => SudokuEntity, sudoku => sudoku.fields)
  sudoku:SudokuEntity;




}
