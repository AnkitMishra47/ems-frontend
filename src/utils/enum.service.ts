import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  private apiURL = environment.apiUrl;

  constructor(private httpClient : HttpClient, 
            private utilsSerivce : UtilsService ) {}

  getObjects(serviceName:string , enabled : boolean = true ) : Observable<any>{
    const params = new HttpParams().set('IsDisabled', enabled != null ? !enabled.toString() : "false");
    return this.httpClient.get(this.apiURL + serviceName , {params} );
  }

  getGenders(onlyEnabled : any = null){
    return this.getObjects("genders" , onlyEnabled).pipe(map(
        data =>{
                return this.utilsSerivce.addNullOptions(data);
            }
        )
    );
  }
}
