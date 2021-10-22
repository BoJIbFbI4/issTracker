import { Injectable } from '@angular/core';

import { Actions } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as SettingsActions from './settings.actions';
import { SettingsState } from './settings.reducer';
import * as SettingsSelectors from './settings.selectors';

@Injectable()
export class SettingsFacade {
  selectedTab$: Observable<'map' | 'report'> = this.store.pipe(select(SettingsSelectors.selectedTab));

  constructor(private readonly actions: Actions, private readonly store: Store<SettingsState>) {}

  setSelectedTab = (payload: 'map' | 'report') => this.dispatch(SettingsActions.setSelectedTab({ payload }));

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
