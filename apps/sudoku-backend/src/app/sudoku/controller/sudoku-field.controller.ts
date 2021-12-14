import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { SudokuFieldService } from '../service/sudoku-field.service';
import { SudokuFieldDto } from '../models/sudoku-field.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

@ApiTags('Sudoku')
@Controller('sudokus/:id/fields')
export class SudokuFieldController {
  constructor(private readonly service: SudokuFieldService) {}

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
  @Get()
  getAll(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    try {
      const entity = this.service.getSudokuFields(id, page, take);
      return plainToClass(SudokuFieldDto,entity);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }


  async create( id:number, sudokuFieldDto:SudokuFieldDto[]);
  async create( id:number, sudokuFieldDto:SudokuFieldDto);
  @ApiBody({type:[SudokuFieldDto]})
  @Post()
  async create(
    @Param('id') id: number,
    @Body() sudokuFieldDto: any,
  ) {
    if(Array.isArray(sudokuFieldDto)){

      for(const f of sudokuFieldDto){
        const field = await this.service.getOneSudokuField(id,f.x,f.y);
        if (field) {
          try {
            await this.service.updateSudokuField(id,f.x, f.y,f);}
          catch (err){
            throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
          }

        } else{
          try {
          await this.service.createSudokuField(id,f);
        } catch (err) {
          throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
        }

        }}

      const entity = await this.service.getSudokuFields(id);
      return plainToClass(SudokuFieldDto,entity);

    }else{
      try {
        return await this.service.createSudokuField(id,sudokuFieldDto);
      } catch (err) {
        throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
      }

    }

  }

  @ApiQuery(
    {
      name:"x",
      type:Number,
      description:"A mandatory Parameter to specify the fields position on the x-axis",
      required:true
    }
  )
  @ApiQuery(
    {
      name:"y",
      type:Number,
      description:"A mandatory Parameter to specify the fields position on the y-axis",
      required:true
    }
  )
  @Put('update')
  async update(@Param('id') id: number,@Query('x') x:number, @Query('y') y:number, @Body() sudokuFieldDto: SudokuFieldDto) {
    try {
      const entity = await this.service.updateSudokuField(id,x,y,sudokuFieldDto);
      return plainToClass(SudokuFieldDto,entity);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }


  @ApiQuery(
    {
      name:"x",
      type:Number,
      description:"A mandatory Parameter to specify the fields position on the x-axis",
      required:true
    }
  )
  @ApiQuery(
    {
      name:"y",
      type:Number,
      description:"A mandatory Parameter to specify the fields position on the y-axis",
      required:true
    }
  )
  @Delete()
  async remove(@Param('id')id:number,@Query('x') x:number, @Query('y') y:number) {
    try {
      const entity = await this.service.removeSudokuField(id,x,y);
      return plainToClass(SudokuFieldDto,entity);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }



}
