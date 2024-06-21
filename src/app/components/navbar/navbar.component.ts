import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive,Router,ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { ICartItem } from '../models/ICartItem';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICart } from '../models/ICart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {


  role : string = '';

  userId : string = ''

  cartItemCount: number = 0;

  cart : ICart |null = null

  constructor(private tokenService : TokenService,private route : Router,public cartService:CartService) {

   


  }
  ngOnInit(): void {
    
    this.role = this.tokenService.getClaim("role")

    this.userId = this.tokenService.getClaim("nameid")

    this.cartService.getCart(this.userId)

    this.cartService.cartSource$.subscribe(cart=>{
      this.cart = cart 

   })
   

  }

  hasToken():Boolean{

    if(localStorage.getItem('authToken'))
      return true 

    return false
    
  }


  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('decodedToken')
    this.route.navigate(["/login"])
  }

  getCount(items : ICartItem[]){

    return items.reduce((sum,item)=>sum+item.quantity,0)
  }


}
