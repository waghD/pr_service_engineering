import { Min,Max } from 'class-validator';

export class SudokuFieldDto {

  @Min(0)
  @Max(9)
    x:number;

  @Min(0)
  @Max(9)
    y:number;

  @Min(0)
  @Max(9)
     value:number;

  @Min(0)
  @Max(9)
     solution:number;





}
