import { Pipe, PipeTransform } from '@angular/core';
import { SatelliteEntity } from '../../core/models/satellite.interface';

@Pipe({
  name: 'dsLocation',
  pure: true,
})
export class GenerateSatelliteLocationPipe implements PipeTransform {
  public transform(
    data: SatelliteEntity | null
  ): GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string | undefined {
    return !!data
      ? {
          /*  type: 'FeatureCollection',
				features: !!data
					? [
							{*/
          type: 'Feature',
          id: 666,
          geometry: {
            type: 'Point',
            coordinates: [+data!.iss_position?.longitude, +data!.iss_position?.latitude],
          },
          properties: {
            timestamp: data!.timestamp,
          },
          /*        },
						]
					: [],*/
        }
      : undefined;
  }
}
