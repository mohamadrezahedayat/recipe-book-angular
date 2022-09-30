import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import * as fromAuth from 'src/app/auth/store/auth.reducer';

export interface AppState{
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State
}

export const appReducer : ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
}