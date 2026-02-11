import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MeterTelemetryHistory,
  VehicleTelemetryHistory,
  MeterLiveStatus,
  VehicleLiveStatus,
} from '@app/domain';

@Injectable()
export class IngestionApiService {
  constructor(
    @InjectRepository(MeterTelemetryHistory)
    private readonly meterHistoryRepo: Repository<MeterTelemetryHistory>,

    @InjectRepository(VehicleTelemetryHistory)
    private readonly vehicleHistoryRepo: Repository<VehicleTelemetryHistory>,

    @InjectRepository(MeterLiveStatus)
    private readonly meterLiveRepo: Repository<MeterLiveStatus>,

    @InjectRepository(VehicleLiveStatus)
    private readonly vehicleLiveRepo: Repository<VehicleLiveStatus>,
  ) {}

  async ingest(payload: any) {
    if ('meterId' in payload) {
      return this.ingestMeter(payload);
    }

    if ('vehicleId' in payload) {
      return this.ingestVehicle(payload);
    }

    throw new BadRequestException('Unknown telemetry payload');
  }

  private async ingestMeter(payload: any) {
    await this.meterHistoryRepo.insert({
      meterId: payload.meterId,
      kwhConsumedAc: payload.kwhConsumedAc,
      voltage: payload.voltage,
      timestamp: new Date(),
    });

    await this.meterLiveRepo.save({
      meterId: payload.meterId,
      lastKwhConsumedAc: payload.kwhConsumedAc,
      voltage: payload.voltage,
      lastUpdatedAt: new Date(),
    });

    return { status: 'meter telemetry ingested' };
  }

  private async ingestVehicle(payload: any) {
    await this.vehicleHistoryRepo.insert({
      vehicleId: payload.vehicleId,
      soc: payload.soc,
      kwhDeliveredDc: payload.kwhDeliveredDc,
      batteryTemp: payload.batteryTemp,
      timestamp: new Date(),
    });

    await this.vehicleLiveRepo.save({
      vehicleId: payload.vehicleId,
      soc: payload.soc,
      lastKwhDeliveredDc: payload.kwhDeliveredDc,
      batteryTemp: payload.batteryTemp,
      lastUpdatedAt: new Date(),
    });

    return { status: 'vehicle telemetry ingested' };
  }
}
