import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleTelemetryHistory, MeterTelemetryHistory } from '@app/domain';

@Injectable()
export class AnalyticsApiService {
  constructor(
    @InjectRepository(VehicleTelemetryHistory)
    private readonly vehicleRepo: Repository<VehicleTelemetryHistory>,

    @InjectRepository(MeterTelemetryHistory)
    private readonly meterRepo: Repository<MeterTelemetryHistory>,
  ) { }

  async getVehiclePerformance(vehicleId: string) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const vehicleAgg = await this.vehicleRepo
      .createQueryBuilder('v')
      .select([
        'SUM(v.kwhDeliveredDc) AS totaldc',
        'AVG(v.batteryTemp) AS avgbatterytemp',
      ])
      .where('v.vehicleId = :vehicleId', { vehicleId })
      .andWhere('v.timestamp >= :since', { since })
      .getRawOne();

    const meterAgg = await this.meterRepo
      .createQueryBuilder('m')
      .select('SUM(m.kwhConsumedAc)', 'totalac')
      .andWhere('m.timestamp >= :since', { since })
      .getRawOne();

    const totalDc = Number(vehicleAgg?.totaldc ?? 0);
    const totalAc = Number(meterAgg?.totalac ?? 0);

    return {
      vehicleId,
      totalEnergyConsumedAc: totalAc,
      totalEnergyDeliveredDc: totalDc,
      efficiency: totalAc > 0 ? totalDc / totalAc : null,
      averageBatteryTemp: Number(vehicleAgg?.avgbatterytemp ?? 0),
    };
  }

}
