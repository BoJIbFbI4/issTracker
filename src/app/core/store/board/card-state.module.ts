import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardStorageModule } from '../../storage/card-storage/card-storage.module';

import { BoardEffects } from './board.effects';
import { BoardFacade } from './board.facade';
import { CARD_FEATURE_KEY, reducer } from './board.reducer';

@NgModule({
  imports: [CardStorageModule, StoreModule.forFeature(CARD_FEATURE_KEY, reducer), EffectsModule.forFeature([BoardEffects])],
  providers: [BoardFacade],
})
export class CardStateModule {}
