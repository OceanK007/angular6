import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://images.media-allrecipes.com/userphotos/600x600/4577103.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test2', 'https://images.media-allrecipes.com/userphotos/600x600/4577103.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe)
  {
    this.recipeWasSelected.emit(recipe);
  }
}
