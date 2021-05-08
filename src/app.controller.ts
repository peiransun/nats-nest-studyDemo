import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { tap } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getData();
  }

  @Get('sum')
  sum(@Query('digits') digits) {
    const data = digits.split(',').map(Number);
    console.log('MasterAppController: sum', data);
    return this.appService
      .sum(data)
      .pipe(tap(result => console.log('MasterAppController: sum result', result)));
  }

  @Get('reverse')
  reverse(@Query('message') message) {
    return this.appService
      .reverse(message)
      .pipe(tap(result => console.log('MasterAppController: reverse result', result)));
  }
}
