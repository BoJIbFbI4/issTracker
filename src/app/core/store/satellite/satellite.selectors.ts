import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SATELLITE_FEATURE_KEY, SatelliteState } from './satellite.reducer';

export const selectSatelliteState = createFeatureSelector<SatelliteState>(SATELLITE_FEATURE_KEY);

export const satelliteState = createSelector(selectSatelliteState, (state) => state.satelliteState);
export const satelliteLocation = createSelector(selectSatelliteState, (state) => state.satelliteLocation);
