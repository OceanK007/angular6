import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.firebaseAuthService.signupUser(email,password);
  }
}
