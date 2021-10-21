import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { LngLatLike } from 'mapbox-gl';
import { SatelliteEntity } from '../../models/satellite.interface';
import * as SatelliteActions from './satellite.actions';

export const SATELLITE_FEATURE_KEY = 'satellite';

export interface SatelliteState extends EntityState<SatelliteEntity> {
  satelliteState: SatelliteEntity | null;
  satelliteLocation: LngLatLike | undefined;
  satelliteStateLoadError: any;
  satelliteStateLoadRun: boolean;
}

export interface SatellitePartialState {
  readonly [SATELLITE_FEATURE_KEY]: SatelliteState;
}

export const cardAdapter: EntityAdapter<SatelliteEntity> = createEntityAdapter<SatelliteEntity>({
  selectId: (card) => card.timestamp,
});

export const cardInitialState: SatelliteState = cardAdapter.getInitialState({
  satelliteState: null,
  satelliteLocation: [0, 0],
  satelliteStateLoadError: null,
  satelliteStateLoadRun: false,
});

export const reducer = createReducer(
  cardInitialState,
  on(SatelliteActions.loadSatelliteState, (state, { type }) => ({
    ...state,
    satelliteStateLoadRun: true,
    satelliteStateLoadError: null,
  })),
  on(SatelliteActions.loadSatelliteStateSuccess, (state, { type, payload }) => ({
    ...state,
    satelliteStateLoadRun: false,
    satelliteLocation: [+payload.iss_position?.longitude || 0, +payload?.iss_position?.latitude || 0],
    satelliteState: payload,
    // satelliteState: { ...payload, timestamp: payload.timestamp * 1000 },
  })),
  on(SatelliteActions.loadSatelliteStateFailure, (state, { type, payload }) => ({
    ...state,
    satelliteStateLoadRun: true,
    satelliteStateLoadError: payload,
  }))
);
