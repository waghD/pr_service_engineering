import { SudokuFieldEntity } from './sudoku-field.entity';

export class SudokuEntity {


  constructor(id: number, name: string, difficulty: string, editTime: number, fields: SudokuFieldEntity[]) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.edit_time = editTime;
    this.fields = fields;
  }

  id: number;
  name: string;
  difficulty: string;
  edit_time: number;
  fields: SudokuFieldEntity[];
}
