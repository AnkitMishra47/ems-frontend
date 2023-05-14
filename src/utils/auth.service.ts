import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: any;
    baseURL = environment.apiUrl;

    constructor(private http: HttpClient) { }

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
}
