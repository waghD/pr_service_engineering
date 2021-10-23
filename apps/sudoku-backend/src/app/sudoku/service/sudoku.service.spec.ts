import { Test, TestingModule } from '@nestjs/testing';
import { SudokuService } from './sudoku.service';

describe('SudokuService', () => {
  let service: SudokuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SudokuService],
    }).compile();

    service = module.get<SudokuService>(SudokuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
