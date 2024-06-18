import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';

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

  
  constructor(
    public router : Router,
    public ActivatedRoute : ActivatedRoute,
    public productService : ProductApiService
  ) {
    
    this.products = []
  }
  ngOnInit(): void {


    this.ActivatedRoute.queryParams.subscribe(params=>{
      if(params['category'])
        {
          console.log(params)
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
  }


  getProductByCategory(category : string ){

     if(category == 'all')
      {
        this.productService.getAll().subscribe({
        
          next:(data:Iproduct[])=>{
  
            console.log(data)
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



}
