import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SudokuDto {

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

   @IsBoolean()
   @ApiProperty()
   diagonal:boolean;


}
