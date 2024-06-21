import { ICartItem } from './../models/ICartItem';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../services/cart.service';
import { Observable, Observer } from 'rxjs';
import { ICart } from '../models/ICart';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {



  cart: ICart | null | undefined;

  cartItems : ICartItem[] | null | undefined= []

  constructor(private cartService:CartService) {
    
  
  }

  ngOnInit(): void {

    this.cartService.cartSource$.subscribe((cart: ICart|null) => {
      this.cart = cart;
      this.cartItems = cart?.cartItems
      //console.log(this.cart);
    });
  }


  removeProduct(event:Event,productId : number){

    event.preventDefault();
    const decodedToken = JSON.parse(localStorage.getItem('decodedToken') as string)
    let userId = decodedToken.nameid
    this.cartService.DeleteProduct(userId,productId);
  }
  

}
