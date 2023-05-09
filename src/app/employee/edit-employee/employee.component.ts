import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UtilsService } from 'src/utils/utils.service';
import { ADD_EMPLOYEE, ADD_EMPLOYEE_SUBHEADER, EDIT_EMPLOYEE, EDIT_EMPLOYEE_SUBHEADER } from 'src/utils/constant';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation : ViewEncapsulation.Emulated
})
export class EmployeeComponent implements OnInit {
  
  employee: Employee = new Employee();
  header   = ADD_EMPLOYEE;
  subHeader = ADD_EMPLOYEE_SUBHEADER;
  isScreenEditable = true;
  @ViewChild('myForm') myForm : NgForm;

  constructor(private employeeService : EmployeeService,
              private router  : Router, 
              private route  : ActivatedRoute,
              private utilsService  : UtilsService){}

  ngOnInit(): void {
    // do nothing
    this.route.params.subscribe(
      (params) => {
        if(params['id'] && params['id'] !== '0'){
          this.getEmployeeByID(params['id']);
        }
        else{

        }
      }
    )
  }

  onCancelClick(){
    this.router.navigate(['employees-list']);
  }

  getEmployeeByID(id : any){
    this.employeeService.getEmployeesByID(id).subscribe(
      {
        next : (data) => {
          this.employee = data;
          this.postEmployeeByIDSuccess(data);
        },
        error : (error) => {
          console.log(error);
          
          this.utilsService.handleErrorMessage(error);
        }
      }
    )
  }

  postEmployeeByIDSuccess(data : any){
      this.header = EDIT_EMPLOYEE;
      this.subHeader = EDIT_EMPLOYEE_SUBHEADER;
      this.employee.IsNewObject = false;
      this.isScreenEditable = false;
  }

  onEditClick(){
    this.isScreenEditable = true;
  }

  onSaveClick(){
      this.employeeService.saveEmployee(this.employee).subscribe(
        {
          next : (data) => {
            this.utilsService.handleSuccessMessage();

            setTimeout(()=>{
              this.myForm.reset();
              this.router.navigate(['employees-list']);
            }, 1500);
          },
          error : (error) => {
            this.utilsService.handleErrorMessage(error);
          }
        })
  }
}
