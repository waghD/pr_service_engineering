import { Min, Max, IsNumber } from 'class-validator';

export class SudokuFieldDto {

  @Min(0)
  @Max(8)
  @IsNumber()
    x:number;

  @Min(0)
  @Max(8)
  @IsNumber()
    y:number;

  @Min(0)
  @Max(9)
  @IsNumber()
     value:number;

  @Min(1)
  @Max(9)
  @IsNumber()
     solution:number;





}
