import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AppReducersImport from '../../ngrx/app.reducers';
import * as FirebaseAuthReducersImport from '../../auth/ngrx/firebase-auth.reducers';
import * as FirebaseAuthActionsImport from '../../auth/ngrx/firebase-auth.actions';
import * as RecipeActionsImport from '../../recipes/ngrx/recipe.actions';
import { Observable } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    authState: Observable<FirebaseAuthReducersImport.State>;

    constructor(private store: Store<AppReducersImport.AppState>) {}

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.store.dispatch(new RecipeActionsImport.StoreRecipes());
    }

    fetchData() {
        this.store.dispatch(new RecipeActionsImport.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new FirebaseAuthActionsImport.Logout());
    }
}