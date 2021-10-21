import { Injectable } from '@angular/core';

import { Actions } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { LngLatLike } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { SatelliteEntity } from '../../models/satellite.interface';
import * as SatelliteActions from './satellite.actions';
import { SatelliteState } from './satellite.reducer';
import * as SatelliteSelectors from './satellite.selectors';

@Injectable()
export class SatelliteFacade {
  satelliteState$: Observable<SatelliteEntity | null> = this.store.pipe(select(SatelliteSelectors.satelliteState));
  satelliteLocation$: Observable<LngLatLike | undefined> = this.store.pipe(select(SatelliteSelectors.satelliteLocation));

  constructor(private readonly actions: Actions, private readonly store: Store<SatelliteState>) {}

  requestSatelliteState = () => this.dispatch(SatelliteActions.loadSatelliteState());

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
