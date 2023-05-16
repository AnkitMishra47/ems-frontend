import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: any;
    baseURL = environment.apiUrl;

    constructor(private http: HttpClient , 
                private jwtHelper : JwtHelperService) { }

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

    setToken(obj : any){
        localStorage.setItem('token', obj);
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('token');
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
