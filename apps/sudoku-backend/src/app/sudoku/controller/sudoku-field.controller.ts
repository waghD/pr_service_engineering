import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { SudokuFieldService } from '../service/sudoku-field.service';
import { SudokuFieldDto } from '../models/sudoku-field.dto';

@Controller('sudokus/:id/fields')
export class SudokuFieldController {
  constructor(private readonly service: SudokuFieldService) {}

  @Get()
  getAll(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    try {
      return this.service.getSudokuFields(id, page, take);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    try {
      return await this.service.getOneSudokuField(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(
    @Param('id') id: number,
    @Body() sudokuFieldDto: SudokuFieldDto,
  ) {
    try {
      return await this.service.createSudokuField(id,sudokuFieldDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() sudokuFieldDto: SudokuFieldDto) {
    try {
      return await this.service.updateSudokuField(id,sudokuFieldDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.service.removeSudokuField(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }



}
