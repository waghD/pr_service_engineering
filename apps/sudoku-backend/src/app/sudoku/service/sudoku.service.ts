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

  async generateSudoku():Promise<SudokuEntity>{
    const generatedSudoku: SudokuEntity = new SudokuEntity();
    generatedSudoku.name= 'sudoku';
    generatedSudoku.difficulty='easy';
    generatedSudoku.edit_time = 0;
    const sudoku = await this.sudokuRepository.save(generatedSudoku);
    sudoku.fields = await this.sudokuFieldService.generateSudokuFields(sudoku.id);
    return sudoku;
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
      await this.sudokuFieldService.removeSudokuField(id,f.x,f.y);
    }
    return this.sudokuRepository.remove(sudoku);
  }




}
