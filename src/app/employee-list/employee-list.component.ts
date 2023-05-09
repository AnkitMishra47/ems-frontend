import { Component, OnInit,ViewChild } from '@angular/core';
import { Employee } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { UtilsService } from 'src/utils/utils.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
 
  employees : Employee[];
  employeeColumns : any[];
  showMessages = false;
  

  constructor(private employeeService : EmployeeService , 
              private utilsService : UtilsService,
              private confirmationService : ConfirmationService , 
              private router : Router) { }

  ngOnInit(): void {
    this.getColoumns();
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.log(error);
      }})
  }

  onEditClick(rowData : any){
    this.router.navigate(['edit-employee' , rowData.id]);
  }

  onDeleteClick(employee: Employee) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.deleteEmployee(employee).subscribe(
          {
            next: (data) => {
              this.utilsService.handleSuccessMessage("Employee Deleted Successfully");
              this.getEmployees();
            }
          }
        )
        this
      },
      reject: () => {

      }
    });
  }

  getColoumns(){
    this.employeeColumns = [
      { field: 'name', header: 'Name', width: '5%' },
      { field: 'email', header: 'Email', width: '5%' },
      { field: 'mobile', header: 'Mobile', width: '5%' },
      { field: '', header: '', width: '2%' },
      { field: '', header: '', width: '2%' }
    ];
  }

}

