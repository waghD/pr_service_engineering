import { Module } from '@nestjs/common';
import { SudokuService } from './service/sudoku.service';
import { SudokuController } from './controller/sudoku.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SudokuEntity } from './models/sudoku.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SudokuEntity])],
  providers: [SudokuService],
  controllers: [SudokuController]
})
export class SudokuModule {}
