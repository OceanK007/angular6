import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AppReducers from '../../ngrx/app.reducers';
import * as FirebaseAuthActionsImport from '../ngrx/firebase-auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new FirebaseAuthActionsImport.TrySignup({username: email, password: password}));
  }
}
