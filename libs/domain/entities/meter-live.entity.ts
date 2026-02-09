import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('meter_live_status')
export class MeterLiveStatus {
  @PrimaryColumn()
  meterId: string;

  @Column('float')
  lastKwhConsumedAc: number;

  @Column('float')
  voltage: number;

  @Column({ type: 'timestamptz' })
  lastUpdatedAt: Date;
}
