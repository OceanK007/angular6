import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as ShoppingListActionsImport from '../../shopping-list/ngrx/shopping-list.actions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as RecipeReducersImport from '../ngrx/recipe.reducers';
import * as RecipeActionsImport from '../ngrx/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<RecipeReducersImport.State>;
  id: number;

  constructor(private router: Router, 
              private activatedRoute: ActivatedRoute, 
              private store: Store<RecipeReducersImport.FeatureState>) { }

  ngOnInit() {
    //const id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  onAddToShoppingList() {
    this.store.select('recipes')
    .pipe(take(1))
    .subscribe(
      (recipeState: RecipeReducersImport.State) => {
        this.store.dispatch(new ShoppingListActionsImport.AddIngredients(recipeState.recipes[this.id].ingredients));
      }
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute}); // another approach
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActionsImport.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
