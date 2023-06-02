import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    @Inject('MATH_SERVICE') private readonly client: ClientProxy,
  ) {}

  public getData() {
    this.client.emit<string>('pub.event', {name: 'Kevin'});
    return ({ message: 'Welcome to master!' });
  }

  public sum(data: number[]): Observable<number> {
    console.log(`3.Client  ${new Date().toISOString()} --> 發布: NATS`, data);
    return this.client.send<number>("sum", data);
  }

  public reverse(message: any): Observable<string> {
    return this.client.send<string>({ cmd: 'reverse' }, message);
  }

}