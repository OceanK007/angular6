import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActionsImport from './shopping-list.actions';

export interface AppState {
    shoppingList: State
} 
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State =
{
    ingredients: 
    [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

// state = initialState // Means if state is not present then use initialState
// So, it's like the default value of state
export function shoppingListReducer(state = initialState, action: ShoppingListActionsImport.ShoppingListActions) {
    switch (action.type)
    {
        case ShoppingListActionsImport.ADD_INGREDIENT: 
            const addIngredient =  {
                //...state,    // spread operator
                ingredients: [...state.ingredients, action.payload]
            }
            //console.log(newState);
            return addIngredient; 
        case ShoppingListActionsImport.ADD_INGREDIENTS:
            const updateIngredients = {
                //...state,    // spread operator
                ingredients: [...state.ingredients, ...action.payload]
            }
            return updateIngredients;
        case ShoppingListActionsImport.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = updatedIngredient;
            const updateIngredient = {
                ...state,
                ingredients: ingredients
            }
            return updateIngredient;
        case ShoppingListActionsImport.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex,1);
            return {
                ...state,
                ingredients: oldIngredients
            }
        case ShoppingListActionsImport.START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            }
        default:
            return state;
    }
    return state;
}