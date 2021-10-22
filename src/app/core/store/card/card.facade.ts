import { Injectable } from '@angular/core';

import { Actions, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardEntity } from '../../models/card.model';

import * as CardActions from './card.actions';
import { CardState } from './card.reducer';
import * as CardSelectors from './card.selectors';

@Injectable()
export class CardFacade {
  cards$: Observable<CardEntity[]> = this.store.pipe(select(CardSelectors.selectCards));
  filteredCards$: Observable<CardEntity[]> = this.store.pipe(select(CardSelectors.filteredCards));
  selectCardCreateRun$: Observable<boolean> = this.store.pipe(select(CardSelectors.selectCardCreateRun));
  selectedCard$: Observable<CardEntity | undefined | any> = this.store.pipe(select(CardSelectors.getSelectedCard));
  lastRemovedCard$: Observable<CardEntity | undefined> = this.store.pipe(select(CardSelectors.lastRemovedCard));

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

  cardRestored$: Observable<CardEntity> = this.actions.pipe(
    ofType(CardActions.revertCardSuccess),
    map((action) => action.payload)
  );

  cardChanged$ = this.actions.pipe(
    ofType(CardActions.changeCardSuccess),
    map((action) => action.payload)
  );

  constructor(private readonly actions: Actions, private readonly store: Store<CardState>) {}

  // card$ = (id: number): Observable<CardEntity | undefined> => this.store.pipe(select(CardSelectors.selectCard(id)));

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
    this.dispatch(CardActions.addCard({ payload: payload }));
  }

  revertCard(payload: CardEntity): void {
    this.dispatch(CardActions.revertCard({ payload: payload }));
  }

  changeCard(payload: CardEntity): void {
    this.dispatch(CardActions.changeCard({ payload }));
  }

  cardFilter(payload: string): void {
    this.dispatch(CardActions.setFilter({ payload }));
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
