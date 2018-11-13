import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";

const firebaseAuthRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(firebaseAuthRoutes)
    ],
    exports: [RouterModule]
})
export class FirebaseAuthRoutingModule {

}