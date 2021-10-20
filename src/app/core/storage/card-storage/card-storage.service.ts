import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardEntity } from '../../models/card.model';
import { LocalStorage } from '../storages/local.storage';

import { CARD_DTO_STUB } from './card.stub';

const CARDS_STORAGE_KEY = 'cards';

@Injectable()
export class CardStorage {
  constructor(private readonly localStorage: LocalStorage) {}

  clear = (): void => this.localStorage.setItem(CARDS_STORAGE_KEY, []);

  get = (): Observable<CardEntity[]> =>
    this.localStorage.getItem<CardEntity[] | null>(CARDS_STORAGE_KEY).pipe(map((cards) => cards ?? CARD_DTO_STUB));

  post = (cards: CardEntity[] | null): void => this.localStorage.setItem(CARDS_STORAGE_KEY, cards);

  reset = (): void => this.localStorage.setItem(CARDS_STORAGE_KEY, CARD_DTO_STUB);
}
