import { SudokuEntity } from './sudoku.entity';

export class SudokuFieldEntity {


  constructor(id: number, x: number, y: number, value: number, solution: number, editable: boolean, sudoku: SudokuEntity) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.value = value;
    this.solution = solution;
    this.editable = editable;
    this.sudoku = sudoku;
  }

  id: number;
  x: number;
  y: number;
  value: number;
  solution: number;
  editable: boolean;
  sudoku: SudokuEntity;
}
