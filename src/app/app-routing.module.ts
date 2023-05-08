import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
      {
        path: 'employees-list',
        component: EmployeeListComponent
      },
      {
        path : 'edit-employee/:id',
        component : EmployeeComponent
      }
    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true , onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
