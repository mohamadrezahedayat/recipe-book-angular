import {Actions,Effect,ofType} from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import { Recipe } from 'src/app/recipes/recipe.model';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects{
  baseUrl = 'https://angular-htttp-default-rtdb.firebaseio.com/';
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>){}
  
  @Effect()
  fetchRecipes = this.actions$
    .pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(()=>{
        return this.http.get<Recipe[]>(
        `${this.baseUrl}recipes.json`)
      }),
      map(
        recipes =>{
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
      }),
      map(recipes=>{
        return new RecipesActions.SetRecipes(recipes);
      })
    )

  @Effect({dispatch:false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([_acttionData, recipesState])=>{
      return this.http.put(`${this.baseUrl}recipes.json`, recipesState.recipes)
    })
  )
}