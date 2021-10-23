import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SudokuEntity } from '../models/sudoku.entity';
import { Repository } from 'typeorm';
import { Sudoku } from '../models/sudoku.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class SudokuService {

  constructor(
    @InjectRepository(SudokuEntity) private readonly SudokuRepository: Repository<SudokuEntity>
  ) {}

  create(sudoku:Sudoku):Observable<Sudoku>{

    return from(this.SudokuRepository.save(sudoku))
  }

  findOne(id:number):Observable<Sudoku> {

    return from(this.SudokuRepository.findOne(id))
  }

  findAll(): Observable<Sudoku[]>{

    return from(this.SudokuRepository.find())
  }

  deleteOne(id:number): Observable<any>{

    return from(this.SudokuRepository.delete(id))
  }

  updateOne(id:number, sudoku:Sudoku): Observable<any>{

    return from(this.SudokuRepository.update(id,sudoku))
  }

}
