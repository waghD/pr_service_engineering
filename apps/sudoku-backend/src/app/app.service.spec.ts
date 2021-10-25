import { Test } from '@nestjs/testing';

import { AppService } from './services/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to service-backend!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to service-backend!',
      });
    });
  });
});
