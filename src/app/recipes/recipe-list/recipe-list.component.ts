import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RecipeReducersImport from '../ngrx/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<RecipeReducersImport.State>;

  constructor(private router: Router, 
              private activatedRoute: ActivatedRoute,
              private store: Store<RecipeReducersImport.FeatureState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

  onNewRecipe() {
    // path parameters are not kept and are removed even when you use relativeTo
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }
}
