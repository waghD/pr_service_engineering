import { Test, TestingModule } from '@nestjs/testing';
import { SudokuFieldController } from './sudoku-field.controller';
import { SudokuFieldService } from '../service/sudoku-field.service';

describe('SudokuFieldController', () => {
  let controller: SudokuFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SudokuFieldController],
      providers:[{
                  provide:SudokuFieldService,
                  useValue:{}
      }]
    }).compile();

    controller = module.get<SudokuFieldController>(SudokuFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
