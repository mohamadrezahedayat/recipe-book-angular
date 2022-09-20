import { Injectable } from "@angular/core";

import { Recipe } from "src/app/recipes/recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
  
  private recipes:Recipe[] = [
    new Recipe(
      'A Test Recipe',
      "This is simply a test",
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0VNPkV72Fx1Huwx01Pc159DqUK_ELmlkEQ&usqp=CAU',
      [
        new Ingredient('Meat',1),
        new Ingredient('French Fries',10),
      ]),
    new Recipe(
      'Another Test Recipe',
      "This is simply a test",
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0VNPkV72Fx1Huwx01Pc159DqUK_ELmlkEQ&usqp=CAU',
      [
        new Ingredient('Buns',2),
        new Ingredient('Lemon',3),
      ])
  ]

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
}