import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as SatelliteActions from './satellite.actions';

@Injectable()
export class SatelliteEffects implements OnInitEffects {
  issAPI = `http://api.open-notify.org/iss-now.json`;
  loadSatelliteState: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(SatelliteActions.loadSatelliteState),
      // filter<any>(([action, { baseUri }]) => !!baseUri),
      act({
        project: () =>
          this.httpClient.get(this.issAPI, { responseType: 'json' }).pipe(
            // filter((response: any) => !!response.success),
            map((response: any) => SatelliteActions.loadSatelliteStateSuccess({ payload: response }))
          ),
        error: (error) => SatelliteActions.loadSatelliteStateFailure({ payload: { error } }),
      })
    )
  );

  constructor(private readonly actions$: Actions, private readonly store: Store, private readonly httpClient: HttpClient) {}

  ngrxOnInitEffects(): Action {
    return SatelliteActions.loadSatelliteState();
  }
}
