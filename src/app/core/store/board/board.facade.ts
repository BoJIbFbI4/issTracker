import { Injectable } from '@angular/core';

import { Actions, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardEntity } from '../../models/card.model';

import * as CardActions from './board.actions';
import { CardState } from './board.reducer';
import * as CardSelectors from './board.selectors';

@Injectable()
export class BoardFacade {
  cards$: Observable<CardEntity[]> = this.store.pipe(select(CardSelectors.selectCards));

  cardsLoadError$ = this.store.pipe(select(CardSelectors.selectCardsLoadError));

  cardsLoadRun$ = this.store.pipe(select(CardSelectors.selectCardsLoadRun));

  cardAdded$: Observable<CardEntity> = this.actions.pipe(
    ofType(CardActions.addCardSuccess),
    map((action) => action.payload)
  );

  cardRemoved$: Observable<CardEntity> = this.actions.pipe(
    ofType(CardActions.removeCardSuccess),
    map((action) => action.payload)
  );

  cardChanged$ = this.actions.pipe(
    ofType(CardActions.changeCardSuccess),
    map((action) => action.payload)
  );

  constructor(private readonly actions: Actions, private readonly store: Store<CardState>) {}

  card$ = (id: number): Observable<CardEntity | null> => this.store.pipe(select(CardSelectors.selectCard(id)));

  clear(): void {
    this.dispatch(CardActions.clearCards());
  }

  load(): void {
    this.dispatch(CardActions.loadCards());
  }

  removeCard(payload: CardEntity): void {
    this.dispatch(CardActions.removeCard({ payload }));
  }

  removeCards(payload: number[]): void {
    this.dispatch(CardActions.removeCards({ payload }));
  }

  addCard(payload: CardEntity): void {
    this.dispatch(CardActions.addCard({ payload }));
  }

  changeCard(payload: CardEntity): void {
    this.dispatch(CardActions.changeCard({ payload }));
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
