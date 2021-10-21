import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardStorageModule } from '../../storage/card-storage/card-storage.module';

import { CardEffects } from './card.effects';
import { CardFacade } from './card.facade';
import { CARD_FEATURE_KEY, reducer } from './card.reducer';

@NgModule({
  imports: [CardStorageModule, StoreModule.forFeature(CARD_FEATURE_KEY, reducer), EffectsModule.forFeature([CardEffects])],
  providers: [CardFacade],
})
export class CardStateModule {}
