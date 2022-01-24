import { ISudokuFieldDto } from './sudoku-field.dto';

export interface ISudokuDto {
  id: number;
  name: string;
  difficulty: string;
  edit_time: number;
  type: string;
  fields?: ISudokuFieldDto[];
  filled_out_ratio?: number;
  time_string?: string;
}
