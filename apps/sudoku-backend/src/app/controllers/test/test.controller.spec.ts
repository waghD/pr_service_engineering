import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { AppService } from '../../services/app.service';

describe('TestController', () => {
  let controller: TestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [AppService]
    }).compile();

    controller = module.get<TestController>(TestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
