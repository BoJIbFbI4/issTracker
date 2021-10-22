import { NgModule, Optional, Self } from '@angular/core';
import { Router } from '@angular/router';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

export const routerStateConfig = {
  stateKey: 'router', // state-slice name for routing state
};

@NgModule({
  imports: [StoreModule.forFeature(routerStateConfig.stateKey, routerReducer), StoreRouterConnectingModule.forRoot(routerStateConfig)],
  exports: [StoreModule, StoreRouterConnectingModule],
})
export class NgrxRouterStoreModule {
  constructor(@Self() @Optional() router: Router) {
    if (router) {
      console.log('All good, NgrxRouterStoreModule');
    } else {
      console.error('NgrxRouterStoreModule must be imported in the same same level as RouterModule');
    }
  }
}
