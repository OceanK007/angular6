import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActionsImport from './recipe.actions';
import * as AppReducersImport from '../../ngrx/app.reducers';

export interface FeatureState extends AppReducersImport.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'https://images.media-allrecipes.com/userphotos/600x600/4577103.jpg', 
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Another Test Recipe', 
        'This is simply a test2', 
        'https://images.media-allrecipes.com/userphotos/600x600/4577103.jpg', 
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
    ]
}

export function recipeReducer(state = initialState, action: RecipeActionsImport.RecipeActions) {
    switch(action.type) {
        case (RecipeActionsImport.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            }
        case (RecipeActionsImport.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case (RecipeActionsImport.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: recipes
            }
        case (RecipeActionsImport.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);   // here action.payload is index value
            return {
                ...state,
                recipes: oldRecipes
            }
        default:
            return state;
    }
}