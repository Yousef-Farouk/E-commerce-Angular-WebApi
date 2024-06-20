import { ICartItem } from './../models/ICartItem';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../services/cart.service';
import { Observable, Observer } from 'rxjs';
import { ICart } from '../models/ICart';
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {


  cartItems$: Observable<ICartItem[]> | undefined;

  cart: ICart|null | undefined;

  cartItems : ICartItem[] = []
  constructor(private cartService:CartService) {
    
    
  }

  ngOnInit(): void {

    this.cartService.cartSource$.subscribe((cart: ICart|null) => {
      this.cart = cart;
      console.log(this.cart);
    });

    // this.cartService.getById("5590d9ff-15f2-4392-b501-a1ef57c815de").subscribe({
      
    //   next:(items:ICart)=>{
    //     this.cart = items
    //     console.log("cart item :",this.cart)
    //   },
    //   error:(error)=>{
    //     console.log(error)
    //   }
    //  }
    // )     

  }


  GetProducts(){
   
  }
  

}
