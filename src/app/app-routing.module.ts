import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { employeeRoutes } from './employee/employee.routing';
import { SidebarComponent } from './full-layout/sidebar/sidebar.component';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AuthGuard } from 'src/utils/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path : '',
    component : SidebarComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path: 'home',
        component: HomeComponent,
        canActivate : [AuthGuard],

      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate : [AuthGuard],

      },
      ...employeeRoutes
    ]
  },
  {
    path : '',
    component : AppComponent,
    children : [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path:'login',
        component: LoginComponent
      },
      {
        path : 'registration',
        component: RegistrationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true , onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
