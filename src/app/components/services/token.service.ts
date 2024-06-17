import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey : string = 'authToken'

  constructor() { }


  getToken():string|null {

    return localStorage.getItem(this.tokenKey);

  }

  decodeToken():any{

    const token = this.getToken()
    if(token){

      return jwtDecode(token)
    }

    return null
  }

  getClaim(claim:string):any{

      const decodedToken = this.decodeToken();

      if(decodedToken){
        return decodedToken[claim]
      }

      return null ;

  }
}
