import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipesService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://images.media-allrecipes.com/userphotos/600x600/4577103.jpg'),
        new Recipe('Another Test Recipe', 'This is simply a test2', 'https://images.media-allrecipes.com/userphotos/600x600/4577103.jpg')
    ];

    getRecipe() {
        return this.recipes.slice();
    }
}