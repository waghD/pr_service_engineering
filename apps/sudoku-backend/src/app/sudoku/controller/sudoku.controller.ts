import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request
} from '@nestjs/common';
import { SudokuService } from '../service/sudoku.service';
import { SudokuDto } from '../models/sudoku.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../../auth/models/user.dto';
import { Public } from '../../auth/public.decorator';

@ApiTags('Sudoku')
@Controller('sudokus')
export class SudokuController {

  constructor(private sudokuService:SudokuService) {}

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return this.sudokuService.getSudokus(page,take,userId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return await this.sudokuService.getOneSudoku(id,userId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() sudokuDto: SudokuDto, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return await this.sudokuService.createSudoku(userId,sudokuDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() sudokuDto: SudokuDto, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return await this.sudokuService.updateSudoku(userId,id, sudokuDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return await this.sudokuService.removeSudoku(userId,id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Public()
  @Post('generate')
   async generateSudoku(){
    try {
      return await this.sudokuService.generateSudoku();
    } catch (err) {
      console.error(err);
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
}
