export class SudokuDto {


  constructor(name: string, difficulty: string) {
    this.name = name;
    this.difficulty = difficulty;
  }

  name: string;
  difficulty: string;
}
