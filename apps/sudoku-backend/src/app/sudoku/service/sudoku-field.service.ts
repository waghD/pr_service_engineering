import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SudokuFieldEntity } from '../models/sudoku-field.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SudokuService } from './sudoku.service';
import { removeSolution } from '../helpers/sudoku-generator';
import { SudokuFieldDto } from '../models/sudoku-field.dto';
import { solveSudoku, sudokuArrayTo2DArray } from '../helpers/sudoku-solver';

@Injectable()
export class SudokuFieldService {
    constructor(
      @InjectRepository(SudokuFieldEntity)
      private readonly sudokufieldRepo: Repository<SudokuFieldEntity>,
      @Inject(forwardRef(() => SudokuService))
      private readonly sudokuService: SudokuService
    ) {}

  async createSudokuField(
    sudokuID: number,
    sudokuFieldDto:SudokuFieldDto,
  ): Promise<SudokuFieldEntity> {
    const sudoku = await this.sudokuService.getOneSudoku(sudokuID);
    const field = new SudokuFieldEntity();
    field.y = sudokuFieldDto.y;
    field.x = sudokuFieldDto.x;
    field.value = sudokuFieldDto.value;
    field.solution = sudokuFieldDto.solution;
    field.editable = sudokuFieldDto.value == 0;
    field.sudoku = sudoku;
    const createdField = await this.sudokufieldRepo.save(field);
    return this.getOneSudokuField(sudokuID,createdField.x, createdField.y);
  }

  async generateSudokuFields(sudokuID:number, type:string){
    const sudoku = await this.sudokuService.getOneSudoku(sudokuID);
    if(sudoku){
      const emptySudoku = new Array<number>();
      for(let x = 0; x < 81; x++) {
        emptySudoku[x] = 0;
      }
      const solved = solveSudoku(emptySudoku,type);

      const solved2D = sudokuArrayTo2DArray(solved);

      const fields = removeSolution(solved, 55);
      const fields2D = sudokuArrayTo2DArray(fields);
      const fieldEntities: SudokuFieldEntity[] = [];
      for(let i = 0; i<9;i++) {

        for (let j = 0; j < 9; j++) {
          const field = new SudokuFieldEntity();
          field.y = i;
          field.x = j;
          field.value = fields2D[i][j];
          field.solution = solved2D[i][j];
          field.editable = fields2D[i][j] == 0;
          field.sudoku = sudoku;
          const fieldEntity = await this.sudokufieldRepo.save(field);
          fieldEntities.push(fieldEntity);
        }
      }
      return fieldEntities;
    }
  }


  async getSudokuFields(sudokuId: number, page=1, take=25): Promise<SudokuFieldEntity[]> {
    return this.sudokufieldRepo.createQueryBuilder("field").
    where("field.sudoku = :id", {id:sudokuId}).
    getMany();
  }

  async getOneSudokuField(id:number,x:number,y:number) {
    return await this.sudokufieldRepo.createQueryBuilder("field")
      .where("field.x = :x and field.y = :y and field.sudoku = :id",{x:x,y:y, id:id}).getOne()
  }


  async updateSudokuField(id:number,x:number,y:number, sudokuFieldDto: SudokuFieldDto): Promise<SudokuFieldEntity> {
    const field = await this.getOneSudokuField(id,x,y);
    if(field) {
               await this.sudokufieldRepo.update(field.id,sudokuFieldDto);
    }

    return await this.sudokufieldRepo.findOneOrFail(field.id);
  }

  async removeSudokuField(x: number,y:number): Promise<SudokuFieldEntity> {
    const field= await this.sudokufieldRepo.findOneOrFail({
      where:[{x:x,y:y}],
    });
    return this.sudokufieldRepo.remove(field);
  }


}
