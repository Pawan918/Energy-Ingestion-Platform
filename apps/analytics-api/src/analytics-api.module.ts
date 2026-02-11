import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@app/database';
import { VehicleTelemetryHistory, MeterTelemetryHistory } from '@app/domain';
import { AnalyticsApiController } from './analytics-api.controller';
import { AnalyticsApiService } from './analytics-api.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([VehicleTelemetryHistory, MeterTelemetryHistory]),
  ],
  controllers: [AnalyticsApiController],
  providers: [AnalyticsApiService],
})
export class AnalyticsApiModule {}
