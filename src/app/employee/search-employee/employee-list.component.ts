import { Component, OnInit,ViewChild, ViewEncapsulation } from '@angular/core';
import { Employee } from '../edit-employee/employee.model';
import { EmployeeService } from '../edit-employee/employee.service';
import { UtilsService } from 'src/utils/utils.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { SearchEmployee } from './employee-list.model';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  encapsulation : ViewEncapsulation.Emulated
})

export class EmployeeListComponent implements OnInit {
 
  employees : any[];
  employeeColumns : any[];
  showMessages = false;
  searchEmployee : SearchEmployee;
  showLoader = false;
  

  constructor(private employeeService : EmployeeService , 
              private utilsService : UtilsService,
              private confirmationService : ConfirmationService , 
              private router : Router) { }

  ngOnInit(): void {
    this.searchEmployee = new SearchEmployee();
    this.getColoumns();
    this.getEmployees();
  }

  onSearchClick(){
    this.getEmployees();      
  }

  getEmployees() {
    this.showLoader = true;
    this.employeeService.getEmployees(this.searchEmployee).subscribe({
      next: (data) => {
        this.employees = data;
        this.showLoader = false;
      },
      error: (error) => {
        this.utilsService.handleErrorMessage(error);
        this.showLoader = false;
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

  onClearClick(){
    this.searchEmployee = new SearchEmployee();
    this.employees = [];
  }

  getColoumns(){
    this.employeeColumns = [
      { field: 'name', header: 'Name', width: '5%' },
      { field: 'email', header: 'Email', width: '5%' },
      { field: 'mobile', header: 'Mobile', width: '5%' },
      { field: 'gender.description', header: 'Gender', width: '5%' },
      { field: '', header: '', width: '2%' },
      { field: '', header: '', width: '2%' }
    ];
  }

}

