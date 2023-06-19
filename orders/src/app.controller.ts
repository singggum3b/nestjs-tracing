import { Controller, Get, Logger, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: Request): Promise<string> {
    this.logger.log(`[${req.headers['X-Correlation-Id']}] [Orders] [Controller]: client call to gw service -> order controller`);
    return this.appService.getHello();
  }
}
