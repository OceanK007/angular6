import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-deactive-guard.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit, CanComponentDeactivate {

  serverName = "My Server";
  isUpdated = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams);
    console.log(this.activatedRoute.snapshot.fragment);

    // You can subscribe to parameters, since params is an observable, 
    // if parameters changes then it will be changed automatically.
    // It's optional here, only use it when you require it.
    // this.activatedRoute.queryParams.subscribe(
    //   (params: Params) => {
    //     console.log("Subscribed allowEdit: "+params['allowEdit']);
    //   }
    // );
    // this.activatedRoute.fragment.subscribe(
    //   (fragment: string) => {console.log("Subscribed fragment: "+fragment)}
    // );
  }

  updateServer() {
    this.isUpdated = true;
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if('My Server' !== this.serverName && !this.isUpdated) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
