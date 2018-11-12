import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.services';
import { AppRoutingModule } from './app-routing.module';
import { RecipesService } from './recipes/recipes-services';
import { DataStorageService } from './shared/data-storage.service';
import { HttpModule } from '@angular/http';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FirebaseAuthService } from './auth/firebase.auth.service';
import { FirebaseAuthGuardService } from './auth/firebase-auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    // BrowserModule is superset of CommonModule. 
    // So add CommonModule in other(feature) modules
    // And BrowserModule must be only in app.module.ts
    BrowserModule,  
    AppRoutingModule,
    HttpModule,
    RecipesModule,
    SharedModule,
    ShoppingListModule
  ],
  // Even if you doing modularization, if you want a service to be available for whole application, provide it in app.module.ts
  providers: [ShoppingListService, RecipesService, DataStorageService, FirebaseAuthService, FirebaseAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
