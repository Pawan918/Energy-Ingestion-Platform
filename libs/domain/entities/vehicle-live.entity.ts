import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('vehicle_live_status')
export class VehicleLiveStatus {
  @PrimaryColumn()
  vehicleId: string;

  @Column('int')
  soc: number;

  @Column('float')
  lastKwhDeliveredDc: number;

  @Column('float')
  batteryTemp: number;

  @Column({ type: 'timestamptz' })
  lastUpdatedAt: Date;
}
