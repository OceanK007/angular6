import { Effect, Actions } from "@ngrx/effects";
import * as RecipeActionsImport from '../ngrx/recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";

export class RecipeEffects {
    databaseURL = 'https://udemy-angular-database.firebaseio.com/recipe-book.json';
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActionsImport.FETCH_RECIPES)
    .pipe(switchMap(
        (action: RecipeActionsImport.FetchRecipes) => {
            // Using interceptor to send auth param
            return this.httpClient.get<Recipe[]>(this.databaseURL, {
                observe: 'body',    // default value is 'body'. Other values: 'response' (it gives full response), 'events'
                responseType: 'json',   // default responseType is 'json'. Other values: 'blob' (for files), 'arraybuffer'
            })
        }
    ))
    .pipe(map(
        (recipes) => {
            console.log(recipes);
            // In case the data fetched has a missing property, then we are
            // using .map operator to explicitly add the missing property in .json                
            for(let recipe of recipes) {
                if(!recipe['ingredients']) {
                    //console.log(recipe);
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: RecipeActionsImport.SET_RECIPES,
                payload: recipes
            };
        }
    ));
}