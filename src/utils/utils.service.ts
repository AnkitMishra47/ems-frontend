import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService} from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private apiURL = environment.apiUrl;
  isDesktop = false;
  isMobile = false;

  constructor(private httpClient : HttpClient, 
              private msgsService : MessageService) {}

  getObjects(serviceName:string , queryParams : any) : Observable<any>{
    return this.httpClient.post(this.apiURL + serviceName , queryParams);
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
    console.log(error);

    let message = error?.error?.message;
    let detailMessage = message?.length > 0 ? message : 'Error Occured';
    this.msgsService.add({ severity: 'error', summary: 'Error', detail: detailMessage });
  }
}
