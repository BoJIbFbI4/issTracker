import { createAction } from '@ngrx/store';
import { SatelliteEntity } from '../../models/satellite.interface';
import { payload } from '../utils/payload.util';

export const loadSatelliteState = createAction('[Satellite] request satellite position');

export const loadSatelliteStateCancel = createAction('[Satellite] satellite position Cancel');

export const loadSatelliteStateSuccess = createAction('[Satellite] satellite position Success', payload<SatelliteEntity>());

export const loadSatelliteStateFailure = createAction('[Satellite] satellite position Failure', payload<any>());
