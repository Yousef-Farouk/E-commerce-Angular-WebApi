import { catchError,map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { IRegister } from '../models/Iregister';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './../tokens/tokens/app-tokens.token';


@Injectable({
  providedIn: 'root'
})
export class RegisterService extends ApiService<IRegister> {

  constructor(http:HttpClient,@Inject(BASE_URL) baseUrl :string) { 

    super(http,"https://localhost:7237/api/Account/register")
  }


  Register(registerData:IRegister):Observable<any>{

    return this.http.post<any>(this.baseUrl,registerData)
                    .pipe(
                      map(response=>{
                        if(response){
                          localStorage.setItem('authToken', response.token);
                          return true 
                        }
                        return false
                      }),
                      catchError(error=>{
                        return throwError(error.error)
                      })
                    )
  }

}
