import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes-services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShopingList(this.recipe.ingredients);
  }
}
