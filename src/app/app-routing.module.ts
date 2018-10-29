import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';

const routes: Routes = [
  // path: '/servers'  :: It is absolute path, so it will be localhost:4200/servers
  // path: 'servers' :: It is relative path, so whatever is in URL bar will be the prefix
  { path: '', component: HomeComponent },
  { path: 'servers', component: ServersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id/:name', component: UserComponent },
];

@NgModule({
  // To register the routes we use .forRoot() of RouterModule
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
