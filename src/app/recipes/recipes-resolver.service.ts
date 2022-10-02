import { Injectable } from "@angular/core";
import {Actions, ofType} from '@ngrx/effects';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";

import { Recipe } from "src/app/recipes/recipe.model";
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import { map, of, switchMap, take } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.store.select('recipes')
      .pipe(
        take(1),
        map(recipesState=>{
          return recipesState.recipes
        }),
        switchMap(recipes=>{
          if(recipes.length ===0){
            this.store.dispatch(new RecipesActions.FetchRecipes())
            return this.actions$.pipe(
              ofType(RecipesActions.SET_RECIPES),
              take(1)
            )
          }else{
            return of(recipes)
          }
        })
    
      )
   
  }
  
}