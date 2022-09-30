import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "src/app/shopping-list/store/shopping-list.action";


export interface State{
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex:number;
}

const initalState: State = {
  ingredients: [
    new Ingredient('Apples',5),
    new Ingredient('Tomatos',2),
  ],
  editedIngredient:null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state:State = initalState, 
  action : ShoppingListActions.ShoppingListActions
){
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        Ingredients: [...state.ingredients, action.payload ]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        Ingredients: [...state.ingredients, ...action.payload ]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        Ingredients: updatedIngredients,
        editedIngredientIndex:-1,
        editedIngredient : null
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        Ingredients: state.ingredients.filter((ing,igIndex)=> igIndex !== state.editedIngredientIndex ),
        editedIngredientIndex:-1,
        editedIngredient : null
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex : action.payload,
        editedIngredient : {...state.ingredients[action.payload]},
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient:null,
        editedIngredientIndex: -1
      };
  
    default:
      return state;
  }
}