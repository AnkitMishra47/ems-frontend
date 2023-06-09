import { Routes } from '@angular/router';
import { EmployeeComponent } from './edit-employee/employee.component';
import { EmployeeListComponent } from './search-employee/employee-list.component';

export const employeeRoutes: Routes = [
    {
        path: 'employees-list',
        component: EmployeeListComponent
    },
    {
        path: 'edit-employee/:id',
        component: EmployeeComponent
    }
];