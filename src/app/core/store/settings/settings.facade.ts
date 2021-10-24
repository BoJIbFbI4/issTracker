import { Injectable } from '@angular/core';

import { Actions } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingsState } from './settings.reducer';
import * as SettingsSelectors from './settings.selectors';

@Injectable()
export class SettingsFacade {
  selectedTab$: Observable<'map' | 'report'> = this.store.pipe(select(SettingsSelectors.selectedTabByRoute));

  constructor(private readonly actions: Actions, private readonly store: Store<SettingsState>) {}

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
