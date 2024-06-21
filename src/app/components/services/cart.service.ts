import { resolve } from 'node:path';
import { IProductToCart } from './../models/IProductToCart';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICart } from '../models/ICart';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartItem } from '../models/ICartItem';
import { tap } from 'rxjs/operators';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiService<ICart> {
  
  private cartSource = new BehaviorSubject<ICart|null>(null);

  cartSource$ = this.cartSource.asObservable();
  
  constructor(http:HttpClient,@Inject(BASE_URL) baseUrl : string ) 
  {
    super(http,"https://localhost:7237/api/Cart")
  }


  getCart(userId:string){
     return this.http.get<ICart>(`${this.baseUrl}/${userId}`).subscribe({
        next:cart=>{
          this.cartSource.next(cart)
        }
      }
     )
  }

  // AddProductToCart(ProductCart : IProductToCart,userId:string ){

  //   return this.http.post<IProductToCart>(`${this.baseUrl}/${userId}`,ProductCart).subscribe({
  //     next:(newCart)=>{
  //       newCart
  //     }
  //   })
  // }



  AddProductToCart(productCart: IProductToCart, userId: string): void {
    this.http.post<ICart>(`${this.baseUrl}/${userId}`, productCart).pipe(
      switchMap(() => this.http.get<ICart>(`${this.baseUrl}/${userId}`)),  // Fetch the updated cart after adding product
      catchError((error) => {
        console.error('Error adding product to cart:', error);
        throw error;
      })
    ).subscribe({
      next: (cart) => {
        this.cartSource.next(cart);
      },
      error: (err) => {
        console.error('Error fetching updated cart:', err);
      }
    });
  }


  DeleteProduct(userId:string,productId : number){

    const params = new HttpParams().set('productId', productId);
    this.http.delete<ICartItem>(`${this.baseUrl}/${userId}`,{params}).pipe(
      switchMap(() => this.http.get<ICart>(`${this.baseUrl}/${userId}`)),  // Fetch the updated cart after deleting product
      catchError((error) => {
        console.error('Error deleting product to cart:', error);
        throw error;
      })
    ).subscribe({
      next: (cart) => {
        this.cartSource.next(cart);
      },
      error: (err) => {
        console.error('Error fetching updated cart:', err);
      }
    });
  }
}


// private cartItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
// cartItemCount$: Observable<number> = this.cartItemCount.asObservable();