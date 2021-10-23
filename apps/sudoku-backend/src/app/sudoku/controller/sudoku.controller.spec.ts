import { Test, TestingModule } from '@nestjs/testing';
import { SudokuController } from './sudoku.controller';

describe('SudokuController', () => {
  let controller: SudokuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SudokuController],
    }).compile();

    controller = module.get<SudokuController>(SudokuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
