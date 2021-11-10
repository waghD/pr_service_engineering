export class SudokuFieldDto {

  constructor(x: number, y: number, value: number, solution: number) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.solution = solution;
  }

  x: number;
  y: number;
  value: number;
  solution: number;
}
