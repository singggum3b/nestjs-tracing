import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CorrelationIdMiddleware,
  CorrelationModule,
  withCorrelation,
} from '@evanion/nestjs-correlation-id';
import { HttpModule } from '@nestjs/axios';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { SentryMiddleware } from './SentryMiddleware';

@Module({
  imports: [
    CorrelationModule.forRoot(),
    HttpModule.registerAsync(withCorrelation()),
    SentryModule.forRoot({
      dsn: "https://8ffc9c5528674a48a519675381750001@o4505384762015744.ingest.sentry.io/4505384793473024",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
    consumer.apply(SentryMiddleware).forRoutes('*');
  }
}
