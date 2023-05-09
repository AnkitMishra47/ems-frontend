import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './full-layout/home/home.component';
import { employeeRoutes } from './employee/employee.routing';
import { SidebarComponent } from './full-layout/sidebar/sidebar.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path : '',
    component : SidebarComponent,
    children : [
      {
        path: 'home',
        component: HomeComponent
      },
      ...employeeRoutes
    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true , onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
