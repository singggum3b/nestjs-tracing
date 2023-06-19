import { Controller, Get, Logger, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService
  ) { }

  @Get()
  async getHello(@Req() req: Request): Promise<string> {
    this.logger.log(`[${req.headers['X-Correlation-Id']}] [GW] [Controller]: client call to gw -> controller`);
    return await this.appService.getHello();
  }
}
