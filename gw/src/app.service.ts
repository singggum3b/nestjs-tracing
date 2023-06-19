import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, Req } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    private readonly httpService: HttpService,
  ) { }
  
  async getHello(): Promise<string> {
    this.logger.log(`[GW] [Service]: controller -> service`);
    const { data } = await firstValueFrom(
      this.httpService.get<string>('http://localhost:3001').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

@EventPattern('msg')
handleMsg(data: Record<string, unknown>) {
    console.log(JSON.stringify(data));
}
}
