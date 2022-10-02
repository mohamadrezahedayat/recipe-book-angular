import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { Recipe } from 'src/app/recipes/recipe.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.action'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route
      .params
      .pipe(
        map(params=> +params['id']),
        switchMap( id =>{
          this.id = id;
          return this.store.select('recipes')
        }),
        map(recipesState=>{
          return recipesState.recipes.find((_recipes,index)=>{
            return index === this.id;
        })}))
      .subscribe( recipe=> this.recipe = recipe)
  }

  onAddToShoppingList(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route}); 
  }

  onDeleteRecipe(){
  this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
   this.router.navigate(['/recipes'])
  }
}
