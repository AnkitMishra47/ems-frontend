import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: any;
    baseURL = environment.apiUrl;

    constructor(private http: HttpClient , 
                private jwtHelper : JwtHelperService , 
                private msgsService : MessageService) { }

    login(loginObj : any): Observable<any> {
       
        return this.http.post(this.baseURL + "login", loginObj, { headers: this.addTokenToHeader() })
            .pipe(
                tap((data: any) => {
                    console.log(data);
                    
                    this.token = data.token;
                    localStorage.setItem('token', this.token);
                })
            );
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('token');
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
    
        console.log(this.msgsService);
    
        this.msgsService.add({ severity: 'error', summary: 'Error', detail: detailMessage });
      }

    getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        return token != null;
    }

    // add this method to all HTTP requests that require authentication
    addTokenToHeader(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const token = this.getToken();
        if (token) {
            return headers.set('Authorization', 'Bearer ' + token);
        }
        return headers;
    }

    getUser(){
        const token = this.getToken();
        const decodedToken = this.jwtHelper.decodeToken(token); // decode the JWT token
        return decodedToken; 
    }
}
