import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ILogin } from '../models/ilogin';
import { ApiService } from './api.service';
import { BASE_URL } from './../tokens/tokens/app-tokens.token';
import { catchError, map } from 'rxjs/operators'; // Import the operators
import { Observable, of } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService<ILogin> {

  constructor(http:HttpClient,@Inject(BASE_URL) baseUrl :string) {

    super(http,"https://localhost:7237/api/Account/login")
  }

  login(loginData:ILogin) : Observable<any>{

    return this.http.post<any>(this.baseUrl, loginData).pipe(
      map(response => {
          if (response) {
              localStorage.setItem('authToken', response.token);
              return true;
          }
          return false;
      }),
      catchError(error => {
          return of(false);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('decodedToken');
    localStorage.removeItem('authToken');


  }
  
  isLoggedIn(): boolean {
    return !! localStorage.getItem('authToken');
  }


}


