import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import { CardEntity } from '../../models/card.model';
import { CardStorage } from '../../storage/card-storage/card-storage.service';
import { fetch } from '../utils/nx.utils';
import * as CardActions from './card.actions';
import * as CardSelectors from './card.selectors';

@Injectable()
export class CardEffects implements OnInitEffects {
  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.loadCards),
      fetch({
        id: () => 'load-cards',
        run: () => this.cardStorage.get().pipe(map((payload) => CardActions.loadCardsSuccess({ payload }))),
        onError: (action, payload) => CardActions.loadCardsFailure({ payload }),
      })
    )
  );

  addCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.addCard),
      fetch({
        id: () => 'add-card',
        run: ({ payload }) => CardActions.addCardSuccess({ payload }),
        onError: (action, payload) => CardActions.addCardFailure({ payload }),
      })
    )
  );

  filterCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.setFilter),
      fetch({
        id: () => 'filter-card',
        run: ({ payload }) =>
          this.cardStorage.get().pipe(
            map((card) =>
              CardActions.filterCardsSuccess({
                payload: _.filter(card, (card) => card.name.trim().toLowerCase().includes(payload.trim().toLowerCase())),
              })
            )
          ),
        onError: (action, payload) => CardActions.loadCardsFailure({ payload }),
      })
    )
  );

  removeCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.removeCard),
      withLatestFrom(this.store.pipe(select(CardSelectors.selectCardsEntities))),
      fetch({
        id: (action) => `remove-card-${action.payload.id}`,
        run: (action, cardsEntities) =>
          cardsEntities && cardsEntities[action.payload.id]
            ? CardActions.removeCardSuccess({ payload: action.payload })
            : CardActions.removeCardCancel(),
        onError: (action, error) => CardActions.removeCardFailure({ payload: { ...error, id: action.payload.id } }),
      })
    )
  );

  changeCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.changeCard),
      fetch({
        id: () => 'change-card',
        run: ({ payload }) => CardActions.changeCardSuccess({ payload }),
        onError: (action, payload) => CardActions.changeCardFailure({ payload }),
      })
    )
  );

  removeCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.removeCards),
      fetch({
        id: () => 'remove-cards',
        run: ({ payload }) => CardActions.removeCardsSuccess({ payload }),
        onError: (action, payload) => CardActions.removeCardsFailure({ payload: { ...payload, cards: action.payload } }),
      })
    )
  );

  localStorageSync$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(
        CardActions.addCardSuccess,
        CardActions.removeCardSuccess,
        CardActions.removeCardsSuccess,
        CardActions.changeCardSuccess,
        CardActions.clearCards
      ),
      debounceTime(222),
      withLatestFrom(this.store.pipe(select(CardSelectors.selectCards))),
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
    return CardActions.loadCards();
  }
}
