import { ISudokuSolverDto } from '@models/ISudokuSolverDto';
import { IsIn, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SudokuFieldDto } from "./sudoku-field.dto";

export class SudokuSolverDto implements ISudokuSolverDto {
  @IsNotEmpty()
  @IsIn(["classic", "diagonal"])
  @ApiProperty()
  type: string;

  @ApiProperty()
  fields: SudokuFieldDto[];
}
