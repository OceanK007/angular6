import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes-services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService] // Will be availabe to child components as well
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
