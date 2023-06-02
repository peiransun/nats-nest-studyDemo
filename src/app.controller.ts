import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { tap } from 'rxjs/operators';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello() {
    return this.appService.getData();
  }

  @Get('sum')
  public sum(@Query('digits') digits) {
    const data = digits.split(',').map(Number);
    console.log(`2.Client  ${new Date().toISOString()} --> 接收: sum`, data);
    return this.appService
      .sum(data)
      .pipe(tap(result => console.log(`4.Client  ${new Date().toISOString()} --> 接收結果: sum result`, result)));
  }

  @Get('reverse')
  public reverse(@Query('message') message) {
    return this.appService
      .reverse(message)
      .pipe(tap(result => console.log('MasterAppController: reverse result', result)));
  }
}
