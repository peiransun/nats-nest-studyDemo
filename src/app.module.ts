import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { natsConfig } from './nats.config';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'MATH_SERVICE',
      ...natsConfig,
    }])
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
