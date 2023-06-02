import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { natsConfig } from './nats.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(natsConfig);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3333;

  await app.startAllMicroservicesAsync();
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    console.log(`1.Client  ${new Date().toISOString()} --> NATS Connect`);
  });
}
bootstrap();
