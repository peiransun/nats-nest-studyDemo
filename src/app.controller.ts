import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, NatsContext, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly minionAppService: AppService) {}

  @MessagePattern('pub.*')
  getDate(@Payload() data, @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`);
    console.log('payload', data)
    return data;
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    console.log('MinionAppController: sum', data);
    return this.minionAppService.sum(data);
  }

  @MessagePattern({ cmd: 'reverse' })
  reverse(message: string): string {
    console.log('MinionAppController: reverse', message);
    return this.minionAppService.reverse(message);
  }
}
