import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private utilsService : UtilsService) { }

  getEmployees(queryParams : any) : Observable<any>{
    return this.utilsService.getObjects("search-employees" , queryParams);
  }

  getEmployeesByID(id : any) : Observable<any>{
    return this.utilsService.getObjectByID("employees" , id);
  }

  saveEmployee(createdObj: any) : Observable<any>{
    return this.utilsService.saveObjects("employees" , createdObj);
  }

  deleteEmployee(deleteObj  :any){
    return this.utilsService.deleteObjects("employees" , deleteObj);
  }
}
