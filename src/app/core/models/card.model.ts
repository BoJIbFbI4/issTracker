import { SatelliteEntity } from './satellite.interface';

export interface CardEntity {
  id: number;
  name: string;
  create_time: string;
  satelliteState: SatelliteEntity | undefined;
}
