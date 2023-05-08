import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private apiURL = environment.apiUrl;


  constructor(private httpClient : HttpClient, 
              private msgsService : MessageService) { }

  getObjects(serviceName:string) : Observable<any>{
    return this.httpClient.get(this.apiURL + serviceName);
  }

  getObjectByID(serviceName : string , id : any){
    return this.httpClient.get(this.apiURL + serviceName + '/' + id);
  }

  saveObjects(serviceName: string , createdObj : any){
    return this.httpClient.post(this.apiURL + serviceName  , createdObj);
  }

  deleteObjects(serviceName: string , deletedObj : any){
    return this.httpClient.delete(this.apiURL + serviceName + '/' + deletedObj.id);
  }
  
  handleSuccessMessage(message : any = null){
    let detailMessage = message?.length > 0 ? message : 'Details Saved Successfully';
    this.msgsService.add({ severity: 'success', detail: detailMessage });
  }

  handleErrorMessage(error : any = null){
    let message = error?.error?.message;
    let detailMessage = message?.length > 0 ? message : 'Error Occured';
    this.msgsService.add({ severity: 'error', summary: 'Error', detail: detailMessage });
  }
}
