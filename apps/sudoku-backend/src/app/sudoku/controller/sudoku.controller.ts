import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SudokuService } from '../service/sudoku.service';
import { Sudoku } from '../models/sudoku.interface';
import { Observable } from 'rxjs';

@Controller('sudokus')
export class SudokuController {

  constructor(private sudokuService:SudokuService) {}

  @Post()
  create(@Body()sudoku:Sudoku):Observable<Sudoku> {
     return this.sudokuService.create(sudoku);
  }

  @Get(':id')
  findOne(@Param('id')id:string):Observable<Sudoku>{

    return this.sudokuService.findOne(Number(id));
  }

  @Get()
  findAll():Observable<Sudoku[]>{
    return this.sudokuService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id')id:string):Observable<any>{
      return this.sudokuService.deleteOne(Number(id));
  }

  @Put(':id')
  updateOne(@Param('id')id:string,@Body()sudoku:Sudoku):Observable<any>{
    return this.sudokuService.updateOne(Number(id),sudoku);
  }


}
