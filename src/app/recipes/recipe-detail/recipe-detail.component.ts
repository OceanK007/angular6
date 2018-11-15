import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes-services';
import { Store } from '@ngrx/store';
import * as ShoppingListActionsImport from '../../shopping-list/ngrx/shopping-list.actions';
import * as ShoppingListReducerImport from '../../shopping-list/ngrx/shopping-list.reducers';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipesService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<ShoppingListReducerImport.AppState>) { }

  ngOnInit() {
    //const id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    //this.recipeService.addIngredientsToShopingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActionsImport.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute}); // another approach
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
