import { Controller, Post, Body } from '@nestjs/common';
import { IngestionApiService } from './ingestion-api.service';

@Controller('v1/ingest')
export class IngestionApiController {
  constructor(private readonly ingestionApiService: IngestionApiService) {}

  @Post()
  ingest(@Body() payload: any) {
    return this.ingestionApiService.ingest(payload);
  }
}
