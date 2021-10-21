export interface SatelliteEntity {
  message: 'success' | 'failed';
  timestamp: number;
  iss_position: {
    latitude: string;
    longitude: string;
  };
}
