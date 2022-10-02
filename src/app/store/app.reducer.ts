import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import * as fromAuth from 'src/app/auth/store/auth.reducer';
import * as fromRecipes from 'src/app/recipes/store/recipe.reducer';

export interface AppState{
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State,
  recipes: fromRecipes.State
}

export const appReducer : ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer
}