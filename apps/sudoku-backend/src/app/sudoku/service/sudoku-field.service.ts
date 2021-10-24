import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SudokuFieldEntity } from '../models/sudoku-field.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SudokuService } from './sudoku.service';
import { SudokuFieldDto } from '../models/sudoku-field.dto';

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
    field.sudoku = sudoku;
    const createdField = await this.sudokufieldRepo.save(field);
    return this.getOneSudokuField(createdField.id);
  }

  async getSudokuFields(sudokuId: number, page: number, take: number): Promise<SudokuFieldEntity[]> {
    const sudoku = await this.sudokuService.getOneSudoku(sudokuId);
    if (sudoku) {
      return sudoku.fields;
    }
  }

  async getOneSudokuField(id: number) {
    return this.sudokufieldRepo.findOneOrFail(id, {
      relations: ['sudoku'],
    });
  }


  async updateSudokuField(id: number, sudokuFieldDto: SudokuFieldDto): Promise<SudokuFieldEntity> {
    const field = await this.sudokufieldRepo.findOneOrFail(id);
    if(field) {await this.sudokufieldRepo.update(id, sudokuFieldDto);}

    return await this.sudokufieldRepo.findOneOrFail(id);
  }

  async removeSudokuField(id: number): Promise<SudokuFieldEntity> {
    const field= await this.sudokufieldRepo.findOneOrFail(id);
    return this.sudokufieldRepo.remove(field);
  }


}
