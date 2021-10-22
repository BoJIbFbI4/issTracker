import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { CardEntity } from '../../models/card.model';
import { selectQueryParams } from '../router/router.selectors';

import { CARD_FEATURE_KEY, cardAdapter, CardState } from './card.reducer';

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

// export const getSelectedCard = createSelector(selectCardState, (state) => state.selectedCard);

export const lastRemovedCard = createSelector(selectCardState, (state) => state.lastRemovedCard);
export const filteredCards = createSelector(selectCardState, (state) => state.filteredCards);

export const getSelectedCard = createSelector(selectCards, selectQueryParams, (cards, { id }) => _.find(cards, { id: +id }));
// export const filteredCards = createSelector(selectCards, selectQueryParams, (cards, { filter }) =>
// _.filter(card, (card) => card.name.trim().toLowerCase().includes(filter.trim().toLowerCase()));
