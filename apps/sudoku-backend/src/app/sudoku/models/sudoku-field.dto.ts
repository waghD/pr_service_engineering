import { Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SudokuFieldDto {

  @ApiProperty()
  @Min(0)
  @Max(8)
  @IsNumber()
    x:number;

  @ApiProperty()
  @Min(0)
  @Max(8)
  @IsNumber()
    y:number;

  @ApiProperty()
  @Min(0)
  @Max(9)
  @IsNumber()
     value:number;

  @ApiProperty()
  @Min(1)
  @Max(9)
  @IsNumber()
     solution:number;
}
