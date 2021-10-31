import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './controllers/test/test.controller';
import { SudokuModule } from './sudoku/sudoku.module';

@Module({
  imports: [
    ConfigModule.forRoot( {isGlobal:true}),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "sudoku",
      autoLoadEntities:true,
      synchronize:true

    }),
    SudokuModule
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
