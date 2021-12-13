import { Module } from '@nestjs/common';
import { SudokuService } from './service/sudoku.service';
import { SudokuController } from './controller/sudoku.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SudokuEntity } from './models/sudoku.entity';
import { SudokuFieldService } from './service/sudoku-field.service';
import { SudokuFieldController } from './controller/sudoku-field.controller';
import { SudokuFieldEntity } from './models/sudoku-field.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([SudokuEntity,SudokuFieldEntity]), AuthModule],
  providers: [SudokuService, SudokuFieldService],
  controllers: [SudokuController, SudokuFieldController]
})
export class SudokuModule {}
