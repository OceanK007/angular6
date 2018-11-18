import * as ShoppingListReducersImport from '../shopping-list/ngrx/shopping-list.reducers';
import * as FirebaseAuthReducersImport from '../auth/ngrx/firebase-auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: ShoppingListReducersImport.State,
    auth: FirebaseAuthReducersImport.State
} 

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: ShoppingListReducersImport.shoppingListReducer,   // shoppingList component is eagerly loaded
    auth: FirebaseAuthReducersImport.firebaseAuthReducer
};