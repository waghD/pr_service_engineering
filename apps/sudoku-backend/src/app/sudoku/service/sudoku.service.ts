import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SudokuEntity } from '../models/sudoku.entity';
import { Repository } from 'typeorm';
import { SudokuFieldService } from './sudoku-field.service';
import { SudokuDto } from '../models/sudoku.dto';


@Injectable()
export class SudokuService {

  constructor(
    @InjectRepository(SudokuEntity) private readonly sudokuRepository: Repository<SudokuEntity>,
    @Inject(forwardRef(() => SudokuFieldService))
    private readonly sudokuFieldService: SudokuFieldService
  ) {}

  getSudokus(page = 1, take = 25): Promise<SudokuEntity[]> {
    return this.sudokuRepository.find({
      relations: ['fields'],
      skip: take * (page - 1),
      take,
    });
  }

  getOneSudoku(id: number): Promise<SudokuEntity> {
    return this.sudokuRepository.findOneOrFail(id, {
      relations: ['fields']
    });
  }

  async createSudoku(sudokuDto: SudokuDto): Promise<SudokuEntity> {
    const sudokuToCreate: SudokuEntity = { ...sudokuDto};
    return this.sudokuRepository.save(sudokuToCreate);
  }

  async updateSudoku(id: number, sudokuDto: SudokuDto): Promise<any> {
    await this.sudokuRepository.findOneOrFail(id);
    return await this.sudokuRepository.update(id, sudokuDto);
  }

  async removeSudoku(id: number): Promise<any> {
    const sudoku = await this.sudokuRepository.findOneOrFail(id, { relations: ['fields'] });
    for (const f of sudoku.fields) {
      await this.sudokuFieldService.removeSudokuField(f.id);
    }
    return this.sudokuRepository.remove(sudoku);
  }




}
