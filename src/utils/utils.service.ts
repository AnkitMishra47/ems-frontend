import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService} from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private apiURL = environment.apiUrl;
  public loggedInUserObj: any;
  isDesktop = false;
  isMobile = false;

  constructor(private httpClient : HttpClient, 
              private msgsService : MessageService,
              private authService : AuthService,)
              {
                
              }

  getObjects(serviceName:string , queryParams : any , ) : Observable<any>{
    return this.httpClient.post(this.apiURL + serviceName , queryParams , { headers: this.authService.addTokenToHeader() });
  }

  getObjectByID(serviceName : string , id : any){
    return this.httpClient.get(this.apiURL + serviceName + '/' + id , { headers: this.authService.addTokenToHeader() });
  }

  saveObjects(serviceName: string , createdObj : any){
    return this.httpClient.post(this.apiURL + serviceName  , createdObj , { headers: this.authService.addTokenToHeader()});
  }

  deleteObjects(serviceName: string , deletedObj : any){
    return this.httpClient.delete(this.apiURL + serviceName + '/' + deletedObj.id , { headers: this.authService.addTokenToHeader()});
  }
  
  handleSuccessMessage(message : any = null){
    let detailMessage = message?.length > 0 ? message : 'Details Saved Successfully';
    this.msgsService.add({ severity: 'success', detail: detailMessage });
  }

  handleErrorMessage(response : any = null , errorMessage : any = null){
    let message ; 
    
    if(response instanceof HttpErrorResponse){
       message = response?.error.error;
    }

    if(errorMessage){
      message = errorMessage;
    }

    let detailMessage = message?.length > 0 ? message : 'Error Occured';
    this.msgsService.add({ severity: 'error', summary: 'Error', detail: detailMessage });
  }

  addNullOptions(data : any[]){
    let nullOption = {value : null , description : 'Please Select'};
    data.unshift(nullOption);
    return data;
  }

  isSuccessfulResponse(data : any){
    if(data.result == 'ok'){
      return true;
    }
    else{
      this.handleErrorMessage(null , 'UnSuccessful Resposne');
      return false;
    }
  }

  getRequest(serviceName : any) : Observable<any>{
    return this.httpClient.get(this.apiURL + serviceName , { headers: this.authService.addTokenToHeader()});
  }

  setLoggedInUser(userObj : any){
    this.loggedInUserObj = userObj;
  }
}
