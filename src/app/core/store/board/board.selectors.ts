import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardEntity } from '../../models/card.model';

import { CARD_FEATURE_KEY, cardAdapter, CardState } from './board.reducer';

export const selectCardState = createFeatureSelector<CardState>(CARD_FEATURE_KEY);

const { selectAll, selectEntities } = cardAdapter.getSelectors();

export const selectCards = createSelector(selectCardState, (state) => selectAll(state));

export const selectCardsEntities = createSelector(selectCardState, (state) => selectEntities(state));

export const selectCardsLoadError = createSelector(selectCardState, (state) => state.cardsLoadError);

export const selectCardsLoadRun = createSelector(selectCardState, (state) => state.cardsLoadRun);

export const selectCardCreateError = createSelector(selectCardState, (state) => state.cardCreateError);

export const selectCardCreateRun = createSelector(selectCardState, (state) => state.cardCreateRun);

export const selectCard = (id: number) =>
  createSelector(selectCardsEntities, (dictionary: Dictionary<CardEntity>) => dictionary[id] ?? null);
