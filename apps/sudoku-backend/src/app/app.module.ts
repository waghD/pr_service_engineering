import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { TestController } from './controllers/test/test.controller';

@Module({
  imports: [
    ConfigModule.forRoot( {isGlobal:true}),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "sudoku",
      autoLoadEntities:true,
      synchronize:true

    })
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
