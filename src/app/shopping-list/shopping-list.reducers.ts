import { Action } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

// state = initialState // Means if state is not present then use initialState
// So, it's like the default value of state
export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type)
    {
        case ADD_INGREDIENT: 
            return {
                ...state,    // spread operator
                ingredients: [...state.ingredients, action]
            }
    }
    return state;
}