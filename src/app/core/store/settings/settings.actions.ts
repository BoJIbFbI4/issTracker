import { createAction } from '@ngrx/store';
import { payload } from '../utils/payload.util';

export const setSelectedTab = createAction('[Settings] set selected tab', payload<'map' | 'report'>());
