import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SatelliteEffects } from './satellite.effects';
import { SatelliteFacade } from './satellite.facade';
import { reducer, SATELLITE_FEATURE_KEY } from './satellite.reducer';

@NgModule({
  imports: [StoreModule.forFeature(SATELLITE_FEATURE_KEY, reducer), EffectsModule.forFeature([SatelliteEffects]), HttpClientModule],
  providers: [SatelliteFacade],
})
export class SatelliteStateModule {}
