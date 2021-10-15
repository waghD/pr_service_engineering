import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../services/app.service';

@Controller('test')
export class TestController {

  constructor(private appService: AppService) {
  }

  @Get()
  getData() {
    return this.appService.getOtherData();
  }

}
