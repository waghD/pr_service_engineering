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

import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest, OptionalAuthRequest } from '../../auth/models/user.dto';
import { Public } from '../../auth/public.decorator';
import { OptionalAuthGuard } from '../../auth/guards/optional-auth.guard';

@ApiTags('Sudoku')
@Controller('sudokus')
export class SudokuController {

  constructor(private sudokuService:SudokuService) {}


  @ApiQuery(
    {
      name:"page",
      type:Number,
      description:"An optional Parameter for paging",
      required:false
    }
  )
  @ApiQuery(
    {
      name:"take",
      type:Number,
      description:"An optional Parameter for specifing number of objects to take",
      required:false
    }
  )
  @ApiQuery(
    {
      name:"type",
      type:String,
      description:"An optional Parameter for filtering specific types of Sudokus",
      required:false
    }
  )
  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number, @Query('type')type: string, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return this.sudokuService.getSudokus(page,take,type,userId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @ApiParam(
    {
      name:"id",
      type:Number,
      description:"A mandatory Parameter for specifying the id of the sudoku",
      required:true
    }
  )
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

  @ApiParam(
    {
      name:"id",
      type:Number,
      description:"A mandatory Parameter for specifying the id of the sudoku",
      required:true
    }
  )
  @Put(':id')
  async update(@Param('id') id: number, @Body() sudokuDto: SudokuDto, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return await this.sudokuService.updateSudoku(userId,id, sudokuDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }


  @ApiParam(
    {
      name:"id",
      type:Number,
      description:"A mandatory Parameter for specifying the id of the sudoku",
      required:true
    }
  )
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req: AuthenticatedRequest) {
    const userId = req.user.id;
    try {
      return await this.sudokuService.removeSudoku(userId,id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @ApiQuery(
    {
      name:"type",
      type:String,
      description:"An mandatory Parameter to specify type of Sudoku",
      required:true
    }
  )
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
