import { CorrelationService } from '@evanion/nestjs-correlation-id';
import { Injectable, Logger } from '@nestjs/common';
import { connect } from 'ts-nats';

@Injectable()
export class AppService {
  constructor(private readonly correlationService: CorrelationService){
    
  }
  private readonly logger = new Logger(AppService.name);
  async getHello(): Promise<string> {
    this.logger.log(`[Orders] [Service]: client call to controller -> service`);
    const nats = await connect({
      url:"http://localhost:4222"
    });
    await nats.publish("msg",JSON.stringify({
      correlationId: this.correlationService.getCorrelationId(),
      data: {
        name: "message triggered from orders service"
      },
    }));
    return '[Orders] Hello World!';
  }
}
