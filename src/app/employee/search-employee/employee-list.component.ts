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
  tableSelectionMode = 'single';
  filterValues: string[] = ['', '', '', ''];

  

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

  onEmployeeTableRowSelect(rowData : any){
    this.onEditClick(rowData);
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
              window.scrollTo({top : 0 , behavior : 'smooth'});
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
      { field: 'name', header: 'Name', width: '25%' , noSort: false , noFilter : false },
      { field: 'email', header: 'Email', width: '30%', noSort: false , noFilter : false },
      { field: 'mobile', header: 'Mobile', width: '20%', noSort: false , noFilter : false },
      { field: 'gender.description', header: 'Gender', width: '15%', noSort: false , noFilter : false },
      { field: '', header: '', width: '10%', noSort: true , noFilter : true },
    ];
  }

  getFilterValue(filter: any | any[]): string {
    if (Array.isArray(filter)) {
      return filter[0].value;
    } else {
      return filter?.value || '';
    }
  }
}

