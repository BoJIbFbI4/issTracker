import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SettingsFacade } from './settings.facade';
import { reducer, SETTINGS_FEATURE_KEY } from './settings.reducer';

@NgModule({
  imports: [StoreModule.forFeature(SETTINGS_FEATURE_KEY, reducer), EffectsModule.forFeature([])],
  providers: [SettingsFacade],
})
export class SettingsStateModule {}
