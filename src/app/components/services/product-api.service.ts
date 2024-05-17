import { productList } from './../models/productList';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  baseUrl:string = "https://localhost:7237/api/product"
  constructor(private http:HttpClient) {


   }

  getAllProducts():Observable<Iproduct[]>{

    return this.http.get<Iproduct[]>(this.baseUrl)
  }

  getProductById(productId : number){

    return this.http.get(`${this.baseUrl}/${productId}`)
  }

  addNewProduct(product:any){

    return this.http.post(`${this.baseUrl}`,product)
  }

  editProduct(productId : number ,product:any){

    return this.http.patch(`${this.baseUrl}`,product)
    
  }

  deleteProduct(productId : number){
      
    return this.http.delete(`${this.baseUrl}/${productId}`)
  }

}
