import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
  }

  loadServerProgramatically() {
    // complex calculation
    
    this.router.navigate(['/servers']); // absolute path
    //this.router.navigate(['servers']); // relative path    

    // Here relative path will work as well, because unlike routerLink, 
    // .navigate() method doesn't know on which route you are currently right now
    // But you can tell .navigate() method that at which location we are currently 
    // by using relativeTo parameter. By default relativeTo is root url i.e. localhost:4200

    //this.router.navigate(['servers'], {relativeTo: this.activatedRoute})
  }

  loadServerByQueryParameters(id: number) {
    // complex calculation
    
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'}); // absolute path
    //this.router.navigate(['servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'}); // relative path    

    // Here relative path will work as well, because unlike routerLink, 
    // .navigate() method doesn't know on which route you are currently right now
    // But you can tell .navigate() method that at which location we are currently 
    // by using relativeTo parameter. By default relativeTo is root url i.e. localhost:4200

    //this.router.navigate(['servers'], {relativeTo: this.activatedRoute})
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
