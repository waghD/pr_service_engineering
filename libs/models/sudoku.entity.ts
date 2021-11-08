import { SudokuFieldEntity } from './sudoku-field.entity';

export class SudokuEntity {


  constructor(id: number, name: string, difficulty: string, fields: SudokuFieldEntity[]) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.fields = fields;
  }

  id: number;
  name: string;
  difficulty: string;
  fields: SudokuFieldEntity[];
}
