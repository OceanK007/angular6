import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as AppReducers from '../../ngrx/app.reducers';
import * as FirebaseAuthActionsImport from '../ngrx/firebase-auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    //this.firebaseAuthService.signinUser(email,password);
    this.store.dispatch(new FirebaseAuthActionsImport.TrySignin({username: email, password: password}));
  }
}
