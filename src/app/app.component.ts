import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // initializing firebase for authentication purpose
    firebase.initializeApp({
      apiKey: "AIzaSyB7vTsGgpkKPdqTT1MyC7MdD0mb810dvHI",
      authDomain: "udemy-angular-database.firebaseapp.com"
    });
  }
}