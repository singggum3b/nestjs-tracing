import { CorrelationService } from '@evanion/nestjs-correlation-id';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SentryMiddleware implements NestMiddleware {
    constructor(
        private readonly correlationService: CorrelationService,
        @InjectSentry() private readonly sentryService: SentryService,
    ) { }

    async use(_req: Request, _res: Response, next: NextFunction) {
        const correlationId = await this.correlationService.getCorrelationId();
        this.sentryService.instance().configureScope((scope) => {
            scope.setTag('correlationId', correlationId);
        });
        next();
    }
}