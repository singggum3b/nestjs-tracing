import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SentryService } from '@ntegral/nestjs-sentry';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(SentryService.SentryServiceInstance());
  await app.listen(3001);
}
bootstrap();
