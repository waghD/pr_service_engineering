import { Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ISudokuFieldDto } from '../../../../../../libs/models/sudoku-field.dto';

@Exclude()
export class SudokuFieldDto implements ISudokuFieldDto{

  @Expose()
  @ApiProperty()
  @Min(0)
  @Max(8)
  @IsNumber()
    x:number;

  @Expose()
  @ApiProperty()
  @Min(0)
  @Max(8)
  @IsNumber()
    y:number;

  @Expose()
  @ApiProperty()
  @Min(0)
  @Max(9)
  @IsNumber()
     value:number;

  @Expose()
  @ApiProperty()
  @Min(1)
  @Max(9)
  @IsNumber()
     solution:number;

  @Expose()
  @ApiProperty()
  readonly editable:boolean;

}
