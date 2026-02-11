import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@app/database';
import {
  MeterTelemetryHistory,
  VehicleTelemetryHistory,
  MeterLiveStatus,
  VehicleLiveStatus,
} from '@app/domain';
import { IngestionApiService } from './ingestion-api.service';
import { IngestionApiController } from './ingestion-api.controller';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      MeterTelemetryHistory,
      VehicleTelemetryHistory,
      MeterLiveStatus,
      VehicleLiveStatus,
    ]),
  ],
  controllers: [IngestionApiController],
  providers: [IngestionApiService],
})
export class IngestionApiModule {}
