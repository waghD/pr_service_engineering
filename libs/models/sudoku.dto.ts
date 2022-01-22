import { ISudokuFieldDto } from "./sudoku-field.dto";

export interface ISudokuDto {
  id:number;
  name:string;
  difficutly:string;
  edit_time:number;
  type:string;
  fields?:ISudokuFieldDto[];
}
