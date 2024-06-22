import { ICartItem } from './../models/ICartItem';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../services/cart.service';
import { Observable, Observer } from 'rxjs';
import { ICart } from '../models/ICart';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IProductToCart } from '../models/IProductToCart';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ICreateOrderItem } from '../models/IcreateOrderItem';
import { ICreateOrder } from '../models/IcreateOrder';
import { error } from 'console';

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

  Order  : ICreateOrder ={ orderItems: [] };; 

  Total : number = 0 

  decodedToken  : any
  userId : string = ''

  constructor(private cartService:CartService,private route : Router,private orderService : OrderService) {
    
  
  }

  ngOnInit(): void {

    this.cartService.cartSource$.subscribe((cart: ICart|null) => {
      this.cart = cart;
      this.cartItems = cart?.cartItems
  
      if (this.cartItems != null)
      {
        this.Total = this.cartItems.reduce((sum,item)=>sum+item.totalPrice,0)
      }
    });

    this.decodedToken = JSON.parse(localStorage.getItem('decodedToken') as string)
    this.userId = this.decodedToken.nameid


  }


  removeProduct(event:Event,productId : number){

    event.preventDefault();
    const decodedToken = JSON.parse(localStorage.getItem('decodedToken') as string)
    let userId = decodedToken.nameid
    this.cartService.DeleteProduct(userId,productId);
  }
  
  onOrder(){


    if(this.cartItems){

      this.Order.orderItems = this.cartItems.map(item=>({
        Quantity:item.quantity,
        Price:item.price,
        ProductId : item.productId
      }))
    }

    // console.log(this.Order)
    // this.orderService.AddOrder(this.Order,this.userId).subscribe({
    //   next:(data)=>{
    //    console.log(data)

       

    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
  

    Swal.fire({
      title: 'Success!',
      text: 'Order has been submitted!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result)=>{
      if(result.isConfirmed){
        this.route.navigate(['/home'])
      }
    })

 
  }

  


}
