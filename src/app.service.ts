import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    @Inject('MATH_SERVICE') private readonly client: ClientProxy,
  ) {}

  getData() {
    this.client.emit<string>('pub.event', {name: 'Kevin'});
    return ({ message: 'Welcome to master!' });
  }

  sum(data: number[]): Observable<number> {
    return this.client.send<number>({ cmd: 'sum' }, data);
  }

  reverse(message: any): Observable<string> {
    return this.client.send<string>({ cmd: 'reverse' }, message);
  }

}