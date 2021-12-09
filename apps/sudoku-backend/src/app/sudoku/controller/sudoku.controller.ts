import {
  Body,
  Controller, DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query, ValidationPipe
} from '@nestjs/common';
import { SudokuService } from '../service/sudoku.service';
import { SudokuDto } from '../models/sudoku.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sudoku')
@Controller('sudokus')
export class SudokuController {

  constructor(private sudokuService:SudokuService) {}

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number,
         @Query('type')type: string,
         ) {
    try {
      return this.sudokuService.getSudokus(page,take,type);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    try {
      return await this.sudokuService.getOneSudoku(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() sudokuDto: SudokuDto) {
    try {
      return await this.sudokuService.createSudoku(sudokuDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() sudokuDto: SudokuDto) {
    try {
      return await this.sudokuService.updateSudoku(id, sudokuDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.sudokuService.removeSudoku(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post('generate')
   async generateSudoku(@Query('type') type:string,){
    try {
      return await this.sudokuService.generateSudoku(type);
    } catch (err) {
      console.error(err);
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }



}
