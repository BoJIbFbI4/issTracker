import { createAction } from '@ngrx/store';
import { CardEntity } from '../../models/card.model';
import { payload } from '../utils/payload.util';

export const loadCards = createAction('[Card] Load Cards');

export const loadCardsCancel = createAction('[Card] Load Cards Cancel');

export const loadCardsSuccess = createAction('[Card] Load Cards Success', payload<CardEntity[]>());

export const loadCardsFailure = createAction('[Card] Load Cards Failure', payload<any>());

export const clearCards = createAction('[Card] Clear Cards');

export const removeCard = createAction('[Card] Remove Card', payload<any>());

export const removeCardCancel = createAction('[Card] Remove Card Cancel');

export const removeCardSuccess = createAction('[Card] Remove Card Success', payload<any>());

export const removeCardFailure = createAction('[Card] Remove Card Failure', payload<any>());

export const removeCards = createAction('[Card] Remove Cards', payload<number[]>());

export const removeCardsCancel = createAction('[Card] Remove Cards Cancel');

export const removeCardsSuccess = createAction('[Card] Remove Cards Success', payload<number[]>());

export const removeCardsFailure = createAction('[Card] Remove Cards Failure', payload<any>());

export const addCard = createAction('[Card] Add Card', payload<CardEntity>());

export const addCardCancel = createAction('[Card] Add Card Cancel');

export const addCardSuccess = createAction('[Card] Add Card Success', payload<CardEntity>());

export const addCardFailure = createAction('[Card] Add Card Failure', payload<any>());

export const changeCard = createAction('[Card] Change Card', payload<CardEntity>());

export const changeCardCancel = createAction('[Card] Change Card Cancel');

export const changeCardSuccess = createAction('[Card] Change Card Success', payload<CardEntity>());

export const changeCardFailure = createAction('[Card] Change Card Failure', payload<any>());
