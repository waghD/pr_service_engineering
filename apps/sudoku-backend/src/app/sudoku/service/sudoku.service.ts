import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SudokuEntity } from '../models/sudoku.entity';
import { Repository } from 'typeorm';
import { SudokuFieldService } from './sudoku-field.service';
import { SudokuDto } from '../models/sudoku.dto';
import { UserService } from '../../auth/services/user.service';



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
    } else {
      return this.sudokuRepository.find({
        where:{user:user},
        relations: ['fields'],
        skip: take * (page - 1),
        take,
      });

    }

  }

  async generateSudoku(type:string, userId?: number):Promise<SudokuEntity>{
    if(type == 'classic' || type == 'diagonal'){
      const generatedSudoku: SudokuEntity = new SudokuEntity();
      generatedSudoku.name= 'sudoku';
      generatedSudoku.difficulty='easy';
      generatedSudoku.edit_time = 0;
      generatedSudoku.type= type;
      const sudoku = await this.sudokuRepository.save(generatedSudoku);
      sudoku.fields = await this.sudokuFieldService.generateSudokuFields(userId ?? 0, sudoku.id, type);
      return sudoku;
    } else{
      throw new HttpException('Not Acceptable',HttpStatus.NOT_ACCEPTABLE);
    }

  }

  getOneSudoku(userId:number,id: number ): Promise<SudokuEntity> {
    if(userId == 0){
      return this.sudokuRepository.findOneOrFail(id, {
        relations: ['fields']
      });
    }
    const user = this.userService.findUserByID(userId);
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
