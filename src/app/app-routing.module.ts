import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/can-deactive-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  // path: '/servers'  :: It is absolute path, so it will be localhost:4200/servers
  // path: 'servers' :: It is relative path, so whatever is in URL bar will be the prefix
  { path: '', component: HomeComponent },
  { path: 'servers', component: ServersComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'servers/:id/edit', component: ServersComponent },
  // canActivate will be automatically applied to children
  // Use canActivateChild: [AuthGuardService] to apply only to children routes
  { path: 'users', canActivate: [AuthGuardService], component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent },
  ] },
  //{ path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  // To register the routes we use .forRoot() of RouterModule
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
