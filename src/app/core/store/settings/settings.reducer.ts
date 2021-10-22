import { createReducer, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';

export const SETTINGS_FEATURE_KEY = 'settings';

export interface SettingsState {
  selectedTab: 'map' | 'report';
}

export interface SettingsPartialState {
  readonly [SETTINGS_FEATURE_KEY]: SettingsState;
}

export const settingsInitialState: SettingsState = {
  selectedTab: 'map',
};
export const reducer = createReducer(
  settingsInitialState,
  on(SettingsActions.setSelectedTab, (state, { type, payload }) => ({ ...state, selectedTab: payload }))
);
