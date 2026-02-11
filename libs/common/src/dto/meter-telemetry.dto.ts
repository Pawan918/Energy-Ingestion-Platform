import { IsNumber, IsString, IsISO8601 } from 'class-validator';

/* eslint-disable @typescript-eslint/no-unsafe-call */
export class MeterTelemetryDto {
  @IsString()
  meterId: string;

  @IsNumber()
  kwhConsumedAc: number;

  @IsNumber()
  voltage: number;

  @IsISO8601()
  timestamp: string;
}
