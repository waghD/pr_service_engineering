import { ISudokuFieldDto } from './sudoku-field.dto';

export interface ISudokuSolverDto {
  type: string;
  fields: ISudokuFieldDto[]
}
