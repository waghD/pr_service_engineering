import { Test, TestingModule } from '@nestjs/testing';
import { SudokuService } from './sudoku.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SudokuEntity } from '../models/sudoku.entity';
import { SudokuFieldService } from './sudoku-field.service';


describe('SudokuService', () => {
  let service: SudokuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SudokuService,
        {
          provide: getRepositoryToken(SudokuEntity),
          useValue: {}
        },
        {
          provide: SudokuFieldService,
          useValue: {}

        }
      ],

    }).compile();

    service = module.get<SudokuService>(SudokuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
