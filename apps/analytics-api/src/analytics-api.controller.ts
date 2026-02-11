import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsApiService } from './analytics-api.service';

@Controller('v1/analytics')
export class AnalyticsApiController {
  constructor(private readonly analyticsApiService: AnalyticsApiService) {}

  @Get('performance/:vehicleId')
  getPerformance(@Param('vehicleId') vehicleId: string) {
    return this.analyticsApiService.getVehiclePerformance(vehicleId);
  }
}
