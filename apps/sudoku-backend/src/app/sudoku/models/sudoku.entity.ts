import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SudokuFieldEntity } from './sudoku-field.entity';

@Entity()
export class SudokuEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  difficulty?:string;

  @OneToMany(type => SudokuFieldEntity,sudokufield => sudokufield.sudoku)
  fields?:SudokuFieldEntity[];



}