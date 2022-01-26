import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SudokuFieldEntity } from '../models/sudoku-field.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SudokuService } from './sudoku.service';
import { removeSolution } from '../helpers/sudoku-generator';
import { SudokuFieldDto } from '../models/sudoku-field.dto';
import {
  ColourSudoku,
  solveColourSudoku,
  solveRegionSudoku,
  solveSudoku,
  sudokuArrayTo2DArray
} from '../helpers/sudoku-solver';
import { SudokuEntity } from '../models/sudoku.entity';
import { SudokuDifficulties } from '../../../../../../libs/enums/SudokuDifficulties';

type DifficultyMap = {
  [key in SudokuDifficulties]: number
}

@Injectable()
export class SudokuFieldService {

  private static readonly DIFFICULTY_MAP: DifficultyMap = {
    [SudokuDifficulties.EASY]: 55,
    [SudokuDifficulties.MEDIUM]: 42,
    [SudokuDifficulties.HARD]: 30,
    [SudokuDifficulties.ULTRA_HARD]: 20
  };

  constructor(
    @InjectRepository(SudokuFieldEntity)
    private readonly sudokufieldRepo: Repository<SudokuFieldEntity>,
    @Inject(forwardRef(() => SudokuService))
    private readonly sudokuService: SudokuService
  ) {
  }

  async createSudokuField(
    userId: number,
    sudokuID: number,
    sudokuFieldDto: SudokuFieldDto
  ): Promise<SudokuFieldEntity> {
    const sudoku = await this.sudokuService.getOneSudoku(userId, sudokuID);
    const field = new SudokuFieldEntity();
    field.y = sudokuFieldDto.y;
    field.x = sudokuFieldDto.x;
    field.value = sudokuFieldDto.value;
    field.solution = sudokuFieldDto.solution;
    field.editable = sudokuFieldDto.value == 0;
    field.sudoku = sudoku;
    const createdField = await this.sudokufieldRepo.save(field);
    return this.getOneSudokuField(sudokuID, createdField.x, createdField.y);
  }

  async solveSudokuField(type: string, sudoku: SudokuFieldDto[]) {
    const flatSudokuArray: number[] = [];
    for (let x = 0; x < 81; x++) {
      flatSudokuArray[x] = 0;
    }
    for (const field of sudoku) {
      flatSudokuArray[field.y * 9 + field.x] = field.value;
    }

    const solved = solveSudoku(flatSudokuArray, type);
    const solved2D = sudokuArrayTo2DArray(solved);

    const fieldEntities: SudokuFieldEntity[] = [];
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        const field = new SudokuFieldEntity();
        field.y = y;
        field.x = x;
        field.value = solved2D[y][x];
        field.solution = solved2D[y][x];
        field.editable = false;
        fieldEntities.push(field);
      }
    }

    return fieldEntities;
  }

  async generateSudokuFields(userId: number, sudokuID: number, type: string, difficulty: SudokuDifficulties) {
    let sudoku: SudokuEntity;
    let coloursudoku: ColourSudoku;
    let solved: number[];
    let colours: number[];
    let colours2d: number[][];
    if (sudokuID > 0) {
      sudoku = await this.sudokuService.getOneSudoku(userId, sudokuID);
    } else {
      sudoku = new SudokuEntity();
    }

    if (sudoku) {
      const emptySudoku = new Array<number>();
      for (let x = 0; x < 81; x++) {
        emptySudoku[x] = 0;
      }
      if (type == 'colour' || type == 'region') {
        const emptycolors = new Array<number>();
        for (let x = 0; x < 81; x++) {
          emptycolors[x] = 0;
        }
        if (type == 'region') {
          coloursudoku = solveRegionSudoku(emptySudoku, emptycolors, type);
        } else {
          coloursudoku = solveColourSudoku(emptySudoku, emptycolors, type);
        }
        solved = coloursudoku.sudoku;
        colours = coloursudoku.colours;
      } else {
        // create a normal diagonal sudoku if it is a diacolor
        if (type == 'diacolour') {
          solved = solveSudoku(emptySudoku, 'diagonal');
        } else {
          solved = solveSudoku(emptySudoku, type);
        }
      }

      if (type == 'diacolour') {
        // 'solved' has now the diagonal sudoku -> create the colors by randomly assigning them via the array
        colours = SudokuFieldService.createColorArray(solved);
      }

      if (type == 'colour' || type == 'region' || type == 'diacolour') {
        colours2d = sudokuArrayTo2DArray(colours);
      }

      const solved2D = sudokuArrayTo2DArray(solved);

      const targetFieldCount = SudokuFieldService.DIFFICULTY_MAP[difficulty] ?? SudokuFieldService.DIFFICULTY_MAP.easy;

      const fields = removeSolution(solved, targetFieldCount);
      const fields2D = sudokuArrayTo2DArray(fields);
      const fieldEntities: SudokuFieldEntity[] = [];

      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          const field = new SudokuFieldEntity();
          field.y = y;
          field.x = x;
          field.value = fields2D[y][x];
          field.solution = solved2D[y][x];
          field.editable = fields2D[y][x] == 0;
          if (type == 'colour' || type == 'diacolour' || type == 'region') field.colour = colours2d[y][x];
          field.sudoku = sudoku;
          let fieldEntity;
          if (sudokuID > 0) {
            fieldEntity = await this.sudokufieldRepo.save(field);
          } else {
            fieldEntity = field;
          }
          fieldEntities.push(fieldEntity);
        }
      }
      return fieldEntities;
    }
  }

  /***
   * Creates assignment of colors based on a given sudoku array
   * @param sudokuValueArray the array containing the actual values
   * @private
   */
  private static createColorArray(sudokuValueArray: number[]) {

    // clone the array with the values for later remembering
    const takenValues = [...sudokuValueArray];
    // create an empty array for the colors to save and later return
    const colorArray = Array(sudokuValueArray.length);

    // for every color idx (1-9)
    for (let colorIdx = 1; colorIdx < 10; colorIdx++) {
      // get 9 values for each color
      for (let valueToLookFor = 1; valueToLookFor < 10; valueToLookFor++) {

        // get a random number to start the index
        let currentIdxInValueArray = SudokuFieldService.getRandomInt(0, 80);

        // search as long as a fitting value is found
        let isNoValueFound = true;
        while (isNoValueFound) {

          // if the idx reaches the end, start from beginning of array
          if (currentIdxInValueArray >= 81) {
            currentIdxInValueArray = 0;
          }

          if (takenValues[currentIdxInValueArray] == valueToLookFor) {
            // the value is one that we look for
            // stop iteration
            isNoValueFound = false;
            // assign color to the result
            colorArray[currentIdxInValueArray] = colorIdx;
            // mark the value as taken by assigning a -1
            takenValues[currentIdxInValueArray] = -1;
          }

          // next iteration search on next value
          currentIdxInValueArray += 1;

        }
      }
    }
    console.log(colorArray);
    return colorArray;
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min
   * if min isn't an integer) and no greater than max (or the next integer
   * lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  private static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  async getSudokuFields(sudokuId: number, page = 1, take = 25): Promise<SudokuFieldEntity[]> {
    return this.sudokufieldRepo.createQueryBuilder('field').where('field.sudoku = :id', { id: sudokuId }).getMany();
  }

  async getOneSudokuField(id: number, x: number, y: number) {
    return await this.sudokufieldRepo.createQueryBuilder('field')
      .where('field.x = :x and field.y = :y and field.sudoku = :id', { x: x, y: y, id: id }).getOne();
  }


  async updateSudokuField(id: number, x: number, y: number, sudokuFieldDto: SudokuFieldDto): Promise<SudokuFieldEntity> {
    const field = await this.getOneSudokuField(id, x, y);
    if (field) {
      await this.sudokufieldRepo.update(field.id, sudokuFieldDto);
    }

    return await this.sudokufieldRepo.findOneOrFail(field.id);
  }

  async removeSudokuField(id: number, x: number, y: number): Promise<SudokuFieldEntity> {
    const field = await this.getOneSudokuField(id, x, y);
    return this.sudokufieldRepo.remove(field);
  }


}
