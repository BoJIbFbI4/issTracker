import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SETTINGS_FEATURE_KEY, SettingsState } from './settings.reducer';

export const selectSettingsState = createFeatureSelector<SettingsState>(SETTINGS_FEATURE_KEY);

export const selectedTab = createSelector(selectSettingsState, (state) => state.selectedTab);
