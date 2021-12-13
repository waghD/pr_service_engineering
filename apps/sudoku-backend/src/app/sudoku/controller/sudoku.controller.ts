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
  Request, UseGuards
} from '@nestjs/common';
import { SudokuService } from '../service/sudoku.service';
import { SudokuDto } from '../models/sudoku.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest, OptionalAuthRequest } from '../../auth/models/user.dto';
import { Public } from '../../auth/public.decorator';
import { OptionalAuthGuard } from '../../auth/guards/optional-auth.guard';

@ApiTags('Sudoku')
@Controller('sudokus')
export class SudokuController {

  constructor(private sudokuService:SudokuService) {}

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number, @Query('type')type: string, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return this.sudokuService.getSudokus(page,take,type,userId);
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
  @UseGuards(OptionalAuthGuard)
  @Post('generate')
   async generateSudoku(@Query('type') type:string, @Request() req: OptionalAuthRequest){
    try {
      if(req.user) {
        return await this.sudokuService.generateSudoku(type, req.user.id);
      } else {
        return await this.sudokuService.generateSudoku(type,0);
      }
    } catch (err) {
      console.error(err);
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
