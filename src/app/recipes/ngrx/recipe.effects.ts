import { Effect, Actions } from "@ngrx/effects";
import * as RecipeActionsImport from '../ngrx/recipe.actions';
import * as RecipeReducersImport from './recipe.reducers';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {
    databaseURL = 'https://udemy-angular-database.firebaseio.com/recipe-book.json';
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<RecipeReducersImport.FeatureState>) {}

    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActionsImport.FETCH_RECIPES)
    .pipe(
        switchMap(
            (action: RecipeActionsImport.FetchRecipes) => {
                // Using interceptor to send auth param
                return this.httpClient.get<Recipe[]>(this.databaseURL, {
                    observe: 'body',    // default value is 'body'. Other values: 'response' (it gives full response), 'events'
                    responseType: 'json',   // default responseType is 'json'. Other values: 'blob' (for files), 'arraybuffer'
                })
            }
        ),
        map(
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
        )
    )

    @Effect({dispatch: false})
    recipeStore = this.actions$
    .ofType(RecipeActionsImport.STORE_RECIPES)
    .pipe(
        withLatestFrom(this.store.select('recipes')),
        switchMap(
            ([action, state]) => {
                const req = new HttpRequest('PUT', this.databaseURL, state.recipes, {reportProgress: true,});
                return this.httpClient.request(req);
            }
        )   
    )
}