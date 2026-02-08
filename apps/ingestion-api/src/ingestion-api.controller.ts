import { Controller, Get } from '@nestjs/common';
import { IngestionApiService } from './ingestion-api.service';

@Controller()
export class IngestionApiController {
  constructor(private readonly ingestionApiService: IngestionApiService) {}

  @Get()
  getHello(): string {
    return this.ingestionApiService.getHello();
  }
}
