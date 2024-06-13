import { productList } from './../models/productList';
import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/iproduct';
import { ApiService } from './api.service';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';


@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends ApiService<Iproduct>{

  // baseUrl:string = "https://localhost:7237/api/product"
  constructor(http:HttpClient,@Inject(BASE_URL) baseUrl :string) {

    super(http,"https://localhost:7237/api/product")
}

  // getAllProducts():Observable<Iproduct[]>{

  //   return this.http.get<Iproduct[]>(this.baseUrl)
  // }

  // getProductById(productId : number){

  //   return this.http.get(`${this.baseUrl}/${productId}`)
  // }

  // addNewProduct(product:any){

  //   console.log(product)
  //   return this.http.post(`${this.baseUrl}`,product)
  // }

  // editProduct(productId : number ,product:any){

  //   return this.http.put(`${this.baseUrl}/${productId}`,product)
    
  // }

  // deleteProduct(productId : number){
      
  //   return this.http.delete(`${this.baseUrl}/${productId}`)
  // }

}
