import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { FirebaseAuthModule } from './auth/firebase-auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './ngrx/app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule is superset of CommonModule. 
    // So add CommonModule in other(feature) modules
    // And BrowserModule must be only in app.module.ts
    BrowserModule,  
    HttpClientModule,
    AppRoutingModule,
    SharedModule,  
    ShoppingListModule,
    FirebaseAuthModule,
    CoreModule,
    StoreModule.forRoot(reducers)   // For NgRX // .forRoot()
  ],
  // Even if you doing modularization, if you want a service to be available for whole application, provide it in app.module.ts
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
