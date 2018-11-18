import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActionsImport from './ngrx/shopping-list.actions';
import * as AppReducersImport from '../ngrx/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  // shoppingList name came from imports array of app.module.ts
  constructor(private store: Store<AppReducersImport.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');  
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActionsImport.StartEdit(index));
  }
}
