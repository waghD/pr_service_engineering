import { Test, TestingModule } from '@nestjs/testing';
import { SudokuFieldService } from './sudoku-field.service';

describe('SudokuFieldService', () => {
  let service: SudokuFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SudokuFieldService],
    }).compile();

    service = module.get<SudokuFieldService>(SudokuFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
