import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { RecipesService } from "../recipes/recipes-services";
import { DataStorageService } from "../shared/data-storage.service";
import { FirebaseAuthGuardService } from "../auth/firebase-auth-guard.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../shared/auth.interceptor";
import { LoggingInterceptor } from "../shared/logging.interceptor";

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
        RecipesService, 
        DataStorageService, 
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },  // multi: true means you can register many interceptors
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }  // Here interceptor ordering will become ordering of execution
        // Only Recipe modules uses FirebaseAuthGuardService, so we can provide here either here of just in Recipe module
        // But since Recipe module is lazily loaded so we better provide it there since only RecipeModule uses it
        // FirebaseAuthGuardService    
    ]
})
export class CoreModule {

}