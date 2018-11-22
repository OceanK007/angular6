import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AlertComponent } from './alert.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular6';
  content = null;

  // // This will work fine
  // constructor() {
  //   setTimeout(() => {
  //     this.content = "<p>Just a paragraph!</p>"
  //   }, 1000);
  // }

  // constructor() {
  //   setTimeout(() => {
  //     // So this <app-alert> will be rendered as html code not as selector component
  //     // Angular won't consider it as selector after angular has already loaded our app
  //     // Here we uses angular elements which can render your selector component 
  //     // Even after your app has been loaded.
  //     this.content = "<app-alert message='Rendered dynamically'></app-alert>"
  //   }, 1000);
  // }

  // This is where we will use angular-elements
  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    const alertElement = createCustomElement(AlertComponent, {injector: injector});
    customElements.define('my-alert', alertElement);
    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml("<my-alert message='Rendered dynamically'></my-alert>");
    }, 1000);
  }
}
