import { IsIn, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ISudokuDto } from '../../../../../../libs/models/sudoku.dto';
import { SudokuFieldDto } from "./sudoku-field.dto";


export class SudokuDto implements ISudokuDto{
 @ApiProperty()
  id:number;

   @ApiProperty()
   @IsNotEmpty()
   name:string;

   @ApiProperty()
   @IsNotEmpty()
   difficulty:string;

   @IsNumber()
   @IsPositive()
   @IsNotEmpty()
   @ApiProperty()
   edit_time:number;

   @IsNotEmpty()
   @IsIn(['classic','diagonal','colour'])
   @ApiProperty()
   type:string;

   readonly fields?:SudokuFieldDto[];
}
