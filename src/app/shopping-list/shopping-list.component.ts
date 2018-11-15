import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActionsImport from './ngrx/shopping-list.actions';
import * as ShoppingListReducerImport from './ngrx/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  // shoppingList name came from imports array of app.module.ts
  constructor(private store: Store<ShoppingListReducerImport.AppState>) { }

  ngOnInit() {
    //this.ingredients = this.shoppingListService.getIngredients();  
    this.shoppingListState = this.store.select('shoppingList');  
  }

  onEditItem(index: number) {
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActionsImport.StartEdit(index));
  }
}
