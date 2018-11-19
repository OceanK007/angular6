import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    // Adding path with loadChildren attribute for lazy loading
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },    // lazily loaded
    { path: 'shopping-list', component: ShoppingListComponent },    // eagerly loaded
];

@NgModule({
    // By default, preloadingStrategy value is nothing, i.e. no preloading 
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],   // pre-loaded
    exports: [RouterModule]
})
export class AppRoutingModule {

}