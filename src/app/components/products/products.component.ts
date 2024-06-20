import { IProductToCart } from './../models/IProductToCart';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';
import { CartService } from '../services/cart.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  search_flag :boolean = false ;
  filter_flag :boolean = false ;

  products: Iproduct[] ;

  userId :string = ''
  
  constructor(
    public router : Router,
    public ActivatedRoute : ActivatedRoute,
    public productService : ProductApiService,
    public cartService  : CartService,
    public tokenService : TokenService
  ) {
    
    this.products = []
  }
  ngOnInit(): void {

    this.ActivatedRoute.queryParams.subscribe(params=>{
      if(params['category'])
        {
          this.productService.getProductByCategory(params['category']).subscribe({
            next:(data:Iproduct[])=>{
              this.products = data
            }
          })
        }
       
      else {
        this.productService.getAll().subscribe({
          next:(data:Iproduct[])=>{
            this.products = data
          }
        });
      }
    })

    this.userId = this.tokenService.getClaim("nameid")

  }


  getProductByCategory(category : string ){

     if(category == 'all')
      {
        this.productService.getAll().subscribe({
        
          next:(data:Iproduct[])=>{
            this.products = data
          }
        })
      }
      else {
        this.productService.getProductByCategory(category).subscribe({
          next:(data:Iproduct[])=>{
            this.products = data
          }
        })
      }
      
      
  }

  displaySearch()
  {
      this.search_flag = !this.search_flag;
  }

  displayFilter()
  {
    this.filter_flag = !this.filter_flag
  }

  addToCart(productid : any){

    const productToCart : IProductToCart ={
      productId : productid , 
      quantity : 1  
    }

    console.log(productid)
    // this.cartService.AddProductToCart(productToCart,this.userId)

  }




  



}
