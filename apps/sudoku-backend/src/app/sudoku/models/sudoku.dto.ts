import { IsIn, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ISudokuDto } from '../../../../../../libs/models/sudoku.dto';


export class SudokuDto implements ISudokuDto{

   @ApiProperty()
   @IsNotEmpty()
   name:string;

   @ApiProperty()
   @IsNotEmpty()
   difficutly:string;

   @IsNumber()
   @IsPositive()
   @IsNotEmpty()
   @ApiProperty()
   edit_time:number;

   @IsNotEmpty()
   @IsIn(['classic','diagonal','colour'])
   @ApiProperty()
   type:string;
}
