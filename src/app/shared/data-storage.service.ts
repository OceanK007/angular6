import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes-services";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class DataStorageService {
    databaseURL = 'https://udemy-angular-database.firebaseio.com/recipe-book.json';
    constructor(private httpClient: HttpClient, private recipesSevice: RecipesService) {}

    // storeRecipes() {
    //     let accessToken = this.firebaseAuthService.getToken();

    //     // Setting headers
    //     // Other methods of headers append, delete, get, getAll, has, key, set
    //     const headers = new HttpHeaders().set('Authorization', 'Bearer token-value-here'); 
    //     // Adding params: You can use the old way by appending params with urls
    //     // Other methods of params: append, delete, get, getAll, has, key, set, toString
    //     const params = new HttpParams().set('auth', accessToken);

    //     return this.httpClient.put(this.databaseURL, this.recipesSevice.getRecipes(), {
    //         //headers: headers,    // Setting headers
    //         params: params
    //     });
    // }

    // // To see progress while saving data: Recommended way
    // storeRecipes() {
    //     let accessToken = this.firebaseAuthService.getToken();
    //     // Setting headers
    //     // Other methods of headers append, delete, get, getAll, has, key, set
    //     const headers = new HttpHeaders().set('Authorization', 'Bearer token-value-here'); 
    //     // Adding params: You can use the old way by appending params with urls
    //     // Other methods of params: append, delete, get, getAll, has, key, set, toString
    //     const params = new HttpParams().set('auth', accessToken);

    //     // Progress works on only this kind of requests i.e. new HttpRequest()
    //     const req = new HttpRequest('PUT', this.databaseURL, this.recipesSevice.getRecipes(), {
    //         reportProgress: true,
    //         //headers: headers,
    //         params: params
    //     });

    //     return this.httpClient.request(req);
    // }

    // Using interceptors to send auth param
    storeRecipes() {
        //let accessToken = this.firebaseAuthService.getToken();
        
        // Progress works on only this kind of requests i.e. new HttpRequest()
        // Using interceptors to set auth param now
        const req = new HttpRequest('PUT', this.databaseURL, this.recipesSevice.getRecipes(), {
            reportProgress: true,
        });

        return this.httpClient.request(req);
    }

    // // Requesting events by passing 3rd parameter to .put() // Watch the subscriber in header.component.ts
    // storeRecipes() {
    //     let accessToken = this.firebaseAuthService.getToken();

    //     return this.httpClient.put(this.databaseURL+'?auth='+accessToken, this.recipesSevice.getRecipes(), {
    //         observe: 'events',
    //     });
    // }

    getRecipes() {
        //let accessToken = this.firebaseAuthService.getToken();

        // this.httpClient.get<Recipe[]>(this.databaseURL+'?auth='+accessToken)
        // .pipe(map(
        //     (recipes) => {
        //         // In case the data fetched has a missing property, then we are
        //         // using .map operator to explicitly add the missing property in .json                
        //         for(let recipe of recipes) {
        //             if(!recipe['ingredients']) {
        //                 //console.log(recipe);
        //                 recipe['ingredients'] = [];
        //             }
        //         }
        //         return recipes;
        //     }
        // )).subscribe(
        //     (recipes: Recipe[]) => {
        //         this.recipesSevice.setRecipes(recipes);
        //     }
        // );

        // // In case we are not getting .json data, then use this way by using 3rd argument of .get() method
        // // You can change .get<Recipe[]>() to .get() since we don't know what kind of data we will get
        // // Here we have used defaults, so we know what kind of data we will get.
        // this.httpClient.get<Recipe[]>(this.databaseURL+'?auth='+accessToken, {
        //     observe: 'body',    // default value is 'body'. Other values: 'response' (it gives full response), 'events'
        //     responseType: 'json',   // default responseType is 'json'. Other values: 'blob' (for files), 'arraybuffer'
        // })
        // .pipe(map(
        //     (recipes) => {
        //         console.log(recipes);
        //         // In case the data fetched has a missing property, then we are
        //         // using .map operator to explicitly add the missing property in .json                
        //         for(let recipe of recipes) {
        //             if(!recipe['ingredients']) {
        //                 //console.log(recipe);
        //                 recipe['ingredients'] = [];
        //             }
        //         }
        //         return recipes;
        //     }
        // )).subscribe(
        //     (recipes: Recipe[]) => {
        //         this.recipesSevice.setRecipes(recipes);
        //     }
        // );


        // Using interceptor to send auth param
        this.httpClient.get<Recipe[]>(this.databaseURL, {
            observe: 'body',    // default value is 'body'. Other values: 'response' (it gives full response), 'events'
            responseType: 'json',   // default responseType is 'json'. Other values: 'blob' (for files), 'arraybuffer'
        })
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
                return recipes;
            }
        )).subscribe(
            (recipes: Recipe[]) => {
                this.recipesSevice.setRecipes(recipes);
            }
        );
    }
}