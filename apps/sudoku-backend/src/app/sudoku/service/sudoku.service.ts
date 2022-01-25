import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SudokuEntity } from '../models/sudoku.entity';
import { Repository } from 'typeorm';
import { SudokuFieldService } from './sudoku-field.service';
import { SudokuDto } from '../models/sudoku.dto';
import { UserService } from '../../auth/services/user.service';
import { SudokuSolverDto } from '../models/sudoku-solver.dto';
import { SudokuDifficulties } from '../../../../../../libs/enums/SudokuDifficulties';


@Injectable()
export class SudokuService {

  constructor(
    @InjectRepository(SudokuEntity) private readonly sudokuRepository: Repository<SudokuEntity>,
    @Inject(forwardRef(() => SudokuFieldService))
    private readonly sudokuFieldService: SudokuFieldService,
    @Inject(forwardRef( () => UserService )) private readonly userService:UserService
  ) {}

  getSudokus(page = 1, take = 25, type:string, userId: number): Promise<SudokuEntity[]> {
    const user = this.userService.findUserByID(userId);
    if(type=='classic'){
      return this.sudokuRepository.find({
        where: {type:'classic', user:user},
        relations: ['fields'],
        skip: take * (page - 1),
        take,
      });


    }else if(type=='diagonal'){
      return this.sudokuRepository.find({
        where:{type:'diagonal', user:user},
        relations: ['fields'],
        skip: take * (page - 1),
        take,
      });
    } else if(type=='region'){
      return this.sudokuRepository.find({
        where:{type:'region', user:user},
        relations: ['fields'],
        skip: take * (page - 1),
        take,
      });
    }else if(type=='colour'){
      return this.sudokuRepository.find({
        where:{type:'colour', user:user},
        relations: ['fields'],
        skip: take * (page - 1),
        take,
      });
    }else if(type=='diacolour'){
      return this.sudokuRepository.find({
        where:{type:'diacolour', user:user},
        relations: ['fields'],
        skip: take * (page - 1),
        take,
      });
    } else {
      return this.sudokuRepository.find({
        where:{user:user},
        relations: ['fields'],
        skip: take * (page - 1),
        take,
      });
    }
  }

  async solveSudoku(sudoku: SudokuSolverDto) {
    return this.sudokuFieldService.solveSudokuField(sudoku.type, sudoku.fields);
  }

  async generateSudoku(type:string, difficulty: SudokuDifficulties, userId?: number):Promise<SudokuEntity>{
    const types = ['classic','diagonal','colour','diacolour', 'region']
    if(types.includes(type)){
      const generatedSudoku: SudokuEntity = new SudokuEntity();
      generatedSudoku.name= 'sudoku';
      generatedSudoku.difficulty = difficulty;
      generatedSudoku.edit_time = 0;
      generatedSudoku.type= type;
      let sudoku;
      if(userId >0){
        generatedSudoku.user = await this.userService.findUserByID(userId);
        sudoku = await this.sudokuRepository.save(generatedSudoku);
      }else{
        generatedSudoku.id= 0;
        sudoku = generatedSudoku;
      }
      sudoku.fields = await this.sudokuFieldService.generateSudokuFields(userId ?? 0, sudoku.id, type, difficulty);
      return sudoku;
    } else{
      throw new HttpException('Not Acceptable',HttpStatus.NOT_ACCEPTABLE);
    }

  }

  async getOneSudoku(userId:number,id: number ): Promise<SudokuEntity> {
    if(userId == 0){
      return this.sudokuRepository.findOneOrFail(id, {
        relations: ['fields']
      });
    }
    const user = await this.userService.findUserByID(userId);
    return this.sudokuRepository.findOneOrFail(id, {
      where:{user:user},
      relations: ['fields']
    });
  }

  async createSudoku(userId:number,sudokuDto: SudokuDto): Promise<SudokuEntity> {
    const user = await this.userService.findUserByID(userId);
    const sudokuToCreate: SudokuEntity = { ...sudokuDto}
    sudokuToCreate.user = user;
    return this.sudokuRepository.save(sudokuToCreate);
  }

  async updateSudoku(userId:number,id: number, sudokuDto: SudokuDto): Promise<any> {
    const user = await this.userService.findUserByID(userId);
    await this.sudokuRepository.findOneOrFail(id,
      {
        where:{user:user}
      }
      );
    return await this.sudokuRepository.update(id, sudokuDto);
  }

  async removeSudoku(userId:number,id: number): Promise<any> {
    const user = await this.userService.findUserByID(userId);
    const sudoku = await this.sudokuRepository.findOneOrFail(id, {
      where:{user:user},
      relations: ['fields'] });
    for (const f of sudoku.fields) {
      await this.sudokuFieldService.removeSudokuField(id,f.x,f.y);
    }
    return this.sudokuRepository.remove(sudoku);
  }




}
