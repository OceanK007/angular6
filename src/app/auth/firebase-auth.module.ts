import { NgModule } from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule } from "@angular/forms";
import { FirebaseAuthRoutingModule } from "./firebase-auth-routing.module";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        FormsModule,
        FirebaseAuthRoutingModule
    ]
})
export class FirebaseAuthModule {

}