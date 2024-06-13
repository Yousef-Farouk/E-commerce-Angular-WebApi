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

    this.productService.data$.subscribe(products=>{
        this.products = products
    })

    if (!this.products.length) {
      this.productService.getAll().subscribe();
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
