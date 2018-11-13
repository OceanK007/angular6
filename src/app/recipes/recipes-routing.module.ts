import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { FirebaseAuthGuardService } from "../auth/firebase-auth-guard.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const recipesRoute: Routes = [
    // Modified path: 'recipes' to path: '' for lazy loading
    { path: '', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent, canActivate: [FirebaseAuthGuardService] },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [FirebaseAuthGuardService] }
    ] },
]

@NgModule({
    imports: [
        // .forChild() must be used for others modules except AppModule
        RouterModule.forChild(recipesRoute)
    ], 
    exports: [RouterModule],
    providers: [
        FirebaseAuthGuardService
    ]
})
export class RecipesRoutingModule {
    
}