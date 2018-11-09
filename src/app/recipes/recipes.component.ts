import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes-services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
