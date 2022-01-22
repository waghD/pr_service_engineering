import { ISudokuDto } from "./sudoku.dto";

export interface ISudokuFieldDto {
  x:number;
  y:number;
  value:number;
  solution:number;
  editable:boolean;
  colour?:number;
}
