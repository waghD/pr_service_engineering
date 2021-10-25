import { Test, TestingModule } from '@nestjs/testing';
import { SudokuFieldService } from './sudoku-field.service';
import { Repository } from 'typeorm';
import { SudokuFieldEntity } from '../models/sudoku-field.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SudokuService } from './sudoku.service';

describe('SudokuFieldService', () => {
  let service: SudokuFieldService;
  let repo:Repository<SudokuFieldEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SudokuFieldService,
        {
          provide: getRepositoryToken(SudokuFieldEntity),
          useValue: {}
        },
        {
          provide: SudokuService,
          useValue:{}
        },

      ],
    }).compile();

    service = module.get<SudokuFieldService>(SudokuFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
