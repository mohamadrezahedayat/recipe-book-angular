import { Recipe } from "src/app/recipes/recipe.model";
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';

export interface State{
  recipes: Recipe[];
}

const initialState: State = {
  recipes : []
}

export function recipeReducer(
  state: State = initialState, 
  action: RecipesActions.RecipesActions
){
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
    return {...state, recipes: [...action.payload]} 

    case RecipesActions.ADD_RECIPE:
    return {...state, recipes: [...state.recipes,action.payload]} 

    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {...state.recipes[action.payload.index],...action.payload.newRecipe};
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
    return {...state, recipes: updatedRecipes}  

    case RecipesActions.DELETE_RECIPE:
    return {...state, recipes: state.recipes.filter((recipe,index)=>index !== action.payload)}    

    default:
      return state;
  }
}