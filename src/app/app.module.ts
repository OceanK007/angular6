import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { FirebaseAuthModule } from './auth/firebase-auth.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule is superset of CommonModule. 
    // So add CommonModule in other(feature) modules
    // And BrowserModule must be only in app.module.ts
    BrowserModule,  
    AppRoutingModule,
    HttpModule,
    SharedModule,  
    ShoppingListModule,
    FirebaseAuthModule,
    CoreModule
  ],
  // Even if you doing modularization, if you want a service to be available for whole application, provide it in app.module.ts
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
