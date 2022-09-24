import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "src/app/recipes/recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  // private recipes:Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     "This is simply a test",
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0VNPkV72Fx1Huwx01Pc159DqUK_ELmlkEQ&usqp=CAU',
  //     [
  //       new Ingredient('Meat',1),
  //       new Ingredient('French Fries',10),
  //     ]),
  //   new Recipe(
  //     'Another Test Recipe',
  //     "This is simply a test",
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0VNPkV72Fx1Huwx01Pc159DqUK_ELmlkEQ&usqp=CAU',
  //     [
  //       new Ingredient('Buns',2),
  //       new Ingredient('Lemon',3),
  //     ])
  // ]

  private recipes:Recipe[] = [];
  
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  constructor(private slService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice(); // we want only a copy not same reference
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1)
    this.recipesChanged.next(this.recipes.slice());
  }
}