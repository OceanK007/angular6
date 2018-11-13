import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { ShoppingListService } from "../shopping-list/shopping-list.services";
import { RecipesService } from "../recipes/recipes-services";
import { DataStorageService } from "../shared/data-storage.service";
import { FirebaseAuthService } from "../auth/firebase-auth.service";
import { FirebaseAuthGuardService } from "../auth/firebase-auth-guard.service";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent // Exporting cause we are using <app-header> tag in app.component.html
    ],
    providers: [
        ShoppingListService, 
        RecipesService, 
        DataStorageService, 
        FirebaseAuthService, 
        // Only Recipe modules uses FirebaseAuthGuardService, so we can provide here either here of just in Recipe module
        // But since Recipe module is lazily loaded so we better provide it there since only RecipeModule uses it
        // FirebaseAuthGuardService    
    ]
})
export class CoreModule {

}