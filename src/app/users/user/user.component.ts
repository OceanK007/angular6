import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id:string, name:string};
  paramsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //console.log(this.activatedRoute.snapshot.params['id']);
    //console.log(this.activatedRoute.snapshot.params['name']);
    this.user = {
      id: this.activatedRoute.snapshot.params['id'],
      name: this.activatedRoute.snapshot.params['name']
    };

    // You can subscribe to parameters, since params is an observable, 
    // if parameters changes then it will be changed automatically in user model.
    // It's optional here, only use it when you require it.
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }

  // Angular destoys subscription for you, but if you have
  // Created your own observables, then this is how to unsubscribe it.
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
