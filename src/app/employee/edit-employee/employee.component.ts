import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UtilsService } from 'src/utils/utils.service';
import { ADD_EMPLOYEE, ADD_EMPLOYEE_SUBHEADER, EDIT_EMPLOYEE, EDIT_EMPLOYEE_SUBHEADER } from 'src/utils/constant';
import { EnumService } from 'src/utils/enum.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation : ViewEncapsulation.Emulated
})
export class EmployeeComponent implements OnInit {
  
  employee: Employee = new Employee();
  header : string  = ADD_EMPLOYEE;
  subHeader : string = ADD_EMPLOYEE_SUBHEADER;
  isScreenEditable = true;
  showLoader = false;
  showData=false;
  selectedValue : any;
  genders : any[];
  @ViewChild('myForm') myForm : NgForm;


  constructor(private employeeService : EmployeeService,
              private router  : Router, 
              private route  : ActivatedRoute,
              private utilsService  : UtilsService,
              private enumService : EnumService){}

  ngOnInit(): void {
    // do nothing
    this.showLoader = true;

    this.getGenderOptions();

    this.route.params.subscribe(
      (params) => {
        if(params['id'] && params['id'] !== '0'){
          this.getEmployeeByID(params['id']);
        }
        else{
          this.createNewEmployee()
          this.showLoader = false;
          this.showData = true;
        }
      }
    )
  }

  createNewEmployee(){
    this.employee = new Employee();
    this.header = ADD_EMPLOYEE;
    this.subHeader  = ADD_EMPLOYEE_SUBHEADER;
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
          this.showData = true;
          this.showLoader = false;
        },
        error : (error) => {
          console.log(error);
          
          this.utilsService.handleErrorMessage(error);
          this.showLoader = false;
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
    this.showLoader = true;
      this.employeeService.saveEmployee(this.employee).subscribe(
        {
          next : (data) => {
            this.utilsService.handleSuccessMessage();
            this.postSave();

          },
          error : (error) => {
            this.utilsService.handleErrorMessage(error);
            this.showLoader = false;
          }
        })
  }

  postSave(){
    this.showLoader = false;
    this.myForm.reset();
    this.router.navigate(['employees-list']);
  }

  getGenderOptions(){
    this.enumService.getGenders().subscribe(
      {
        next : (data)=>{
          this.genders = data;
        },
        error : (error)=>{
          console.log(error);
        }
      }
    )
  }
}
