import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import { CardEntity } from '../../models/card.model';
import { CardStorage } from '../../storage/card-storage/card-storage.service';
import { fetch } from '../utils/nx.utils';
import * as BoardActions from './board.actions';
import * as BoardSelectors from './board.selectors';

@Injectable()
export class BoardEffects implements OnInitEffects {
  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadCards),
      fetch({
        id: () => 'load-cards',
        run: () => this.cardStorage.get().pipe(map((payload) => BoardActions.loadCardsSuccess({ payload }))),
        onError: (action, payload) => BoardActions.loadCardsFailure({ payload }),
      })
    )
  );

  addCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addCard),
      withLatestFrom(this.store.pipe(select(BoardSelectors.selectCards))),
      fetch({
        id: () => 'add-card',
        run: ({ payload }, cards) => BoardActions.addCardSuccess({ payload }),
        onError: (action, payload) => BoardActions.addCardFailure({ payload }),
      })
    )
  );

  removeCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.removeCard),
      withLatestFrom(this.store.pipe(select(BoardSelectors.selectCardsEntities))),
      fetch({
        id: (action) => `remove-card-${action.payload.id}`,
        run: (action, cardsEntities) => {
          const card = cardsEntities ? cardsEntities[action.payload.id] : null;

          return card ? BoardActions.removeCardSuccess({ payload: action.payload }) : BoardActions.removeCardCancel();
        },
        onError: (action, error) => BoardActions.removeCardFailure({ payload: { ...error, id: action.payload.id } }),
      })
    )
  );

  changeCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.changeCard),
      fetch({
        id: () => 'change-card',
        run: ({ payload }) => BoardActions.changeCardSuccess({ payload }),
        onError: (action, payload) => BoardActions.changeCardFailure({ payload }),
      })
    )
  );

  removeCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.removeCards),
      fetch({
        id: () => 'remove-cards',
        run: ({ payload }) => BoardActions.removeCardsSuccess({ payload }),
        onError: (action, payload) => BoardActions.removeCardsFailure({ payload: { ...payload, cards: action.payload } }),
      })
    )
  );

  localStorageSync$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(
        BoardActions.addCardSuccess,
        BoardActions.removeCardSuccess,
        BoardActions.removeCardsSuccess,
        BoardActions.changeCardSuccess,
        BoardActions.clearCards
      ),
      debounceTime(222),
      withLatestFrom(this.store.pipe(select(BoardSelectors.selectCards))),
      fetch({
        id: (action) => `local-storage-sync-cards-${action.type}`,
        run: (action, cards: CardEntity[]) => {
          this.cardStorage.post(cards ?? []);
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private readonly store: Store, private readonly cardStorage: CardStorage) {}

  ngrxOnInitEffects(): Action {
    return BoardActions.loadCards();
  }
}
