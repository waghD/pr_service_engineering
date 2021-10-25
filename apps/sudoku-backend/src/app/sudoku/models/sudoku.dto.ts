import { IsNotEmpty } from 'class-validator';

export class SudokuDto {

   @IsNotEmpty()
   name:string;

   @IsNotEmpty()
   difficutly:string;



}
