import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { sortByDate } from '../../../shared/utils/sortByDate';
import { CardEntity } from '../../models/card.model';

import * as CardActions from './board.actions';

export const CARD_FEATURE_KEY = 'card';

export interface CardState extends EntityState<CardEntity> {
  cardsLoadError: any;
  cardsLoadRun: boolean;

  cardCreateError: any;
  cardCreateRun: boolean;

  cardsRemoveError: any;
  cardsRemoveRun: boolean;
}

export interface CardPartialState {
  readonly [CARD_FEATURE_KEY]: CardState;
}

export const cardAdapter: EntityAdapter<CardEntity> = createEntityAdapter<CardEntity>({
  selectId: (card) => card.id,
  sortComparer: (a, b) => sortByDate(a.update_time || a.create_time, b.update_time || b.create_time),
});

export const cardInitialState: CardState = cardAdapter.getInitialState({
  cardsLoadError: null,
  cardsLoadRun: false,
  cardCreateError: null,
  cardCreateRun: false,
  cardsRemoveError: null,
  cardsRemoveRun: false,
});

export const reducer = createReducer(
  cardInitialState,
  on(CardActions.loadCards, (state) => ({
    ...state,
    cardsLoadError: null,
    cardsLoadRun: true,
  })),
  on(CardActions.loadCardsSuccess, (state, { payload }) =>
    cardAdapter.setAll(payload, {
      ...state,
      cardsLoadRun: false,
    })
  ),
  on(CardActions.loadCardsFailure, (state, { payload }) => ({
    ...state,
    cardsLoadError: payload,
    cardsLoadRun: false,
  })),
  on(CardActions.clearCards, (state) =>
    cardAdapter.removeAll({
      ...state,
    })
  ),
  on(CardActions.removeCard, (state, { payload }) =>
    cardAdapter.updateOne(
      {
        id: payload.id,
        changes: {},
      },
      {
        ...state,
        cardRemoveRun: true,
      }
    )
  ),
  on(CardActions.removeCardSuccess, (state, { payload }) => cardAdapter.removeOne(payload.id, state)),
  on(CardActions.removeCardFailure, (state, { payload }) =>
    cardAdapter.updateOne(
      {
        id: payload.id,
        changes: {},
      },
      {
        ...state,
        cardRemoveError: payload,
        cardRemoveRun: false,
      }
    )
  ),
  on(CardActions.addCard, (state) => ({
    ...state,
    cardCreateError: null,
    cardCreateRun: true,
  })),
  on(CardActions.addCardSuccess, (state, { payload }) =>
    cardAdapter.addOne(payload, {
      ...state,
      cardCreateRun: false,
    })
  ),
  on(CardActions.addCardFailure, (state, { payload }) => ({
    ...state,
    cardCreateError: payload,
    cardCreateRun: false,
  })),
  on(CardActions.changeCard, (state, { payload }) =>
    cardAdapter.updateOne(
      {
        id: payload.id,
        changes: {},
      },
      {
        ...state,
        cardChangeRun: true,
      }
    )
  ),
  on(CardActions.changeCardSuccess, (state, { payload }) =>
    cardAdapter.updateOne(
      {
        id: payload.id,
        changes: payload,
      },
      {
        ...state,
        cardChangeRun: false,
      }
    )
  ),
  on(CardActions.changeCardFailure, (state, { payload }) =>
    cardAdapter.updateOne(
      {
        id: payload.id,
        changes: {},
      },
      {
        ...state,
        cardChangeError: payload,
        cardChangeRun: false,
      }
    )
  ),
  on(CardActions.removeCards, (state) => ({
    ...state,
    cardsRemoveError: null,
    cardsRemoveRun: true,
  })),
  on(CardActions.removeCardsSuccess, (state, { payload }) =>
    cardAdapter.removeMany(payload, {
      ...state,
      cardsRemoveRun: false,
    })
  ),
  on(CardActions.removeCardsFailure, (state, { payload }) => ({
    ...state,
    cardsRemoveError: payload,
    cardsRemoveRun: false,
  }))
);
