import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SudokuDto {

   @ApiProperty()
   @IsNotEmpty()
   name:string;

   @ApiProperty()
   @IsNotEmpty()
   difficutly:string;
}
