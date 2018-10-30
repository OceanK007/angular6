import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

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

}
