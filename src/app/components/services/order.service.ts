import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';
import { IOrder } from '../models/Iorder';
import { ICreateOrder } from '../models/IcreateOrder';
import { ICreateOrderItem } from '../models/IcreateOrderItem';
import { error } from 'console';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiService<IOrder> {

  constructor( http:HttpClient,@Inject(BASE_URL) baseUrl : string) {

      super(http,'https://localhost:7237/api/Order')

  }


  AddOrder( Order: ICreateOrder, userId: string):Observable<ICreateOrder> {
    return this.http.post<ICreateOrder>(`${this.baseUrl}/${userId}`,Order)
    
  }
}
