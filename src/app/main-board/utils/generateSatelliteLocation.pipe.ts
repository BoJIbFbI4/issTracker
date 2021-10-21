import { Pipe, PipeTransform } from '@angular/core';
import { SatelliteEntity } from '../../core/models/satellite.interface';

@Pipe({
  name: 'dsLocation',
  pure: true,
})
export class GenerateSatelliteLocationPipe implements PipeTransform {
  public transform(
    data: SatelliteEntity
  ): GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string | undefined {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 666,
          geometry: {
            type: 'Point',
            coordinates: [+data?.iss_position?.longitude || 0, +data?.iss_position?.latitude || 0],
          },
          properties: {
            timestamp: data.timestamp,
          },
        },
      ],
    };
  }
}
