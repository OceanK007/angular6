import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes-services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipesService: RecipesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    // path parameters are not kept and are removed even when you use relativeTo
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }
}
