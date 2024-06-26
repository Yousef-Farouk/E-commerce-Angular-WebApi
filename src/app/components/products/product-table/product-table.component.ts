import { CommonModule } from '@angular/common';
import { Component, OnInit,Input,Output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { error } from 'console';
import { ProductApiService } from '../../services/product-api.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,NavbarComponent,FooterComponent],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit{


  @Input() product :any = {} 
    
  products:Iproduct[]

  productId : number = 0 ;

  constructor(
    public router : Router,
    public ActivatedRoute :ActivatedRoute,
    public productService : ProductApiService ){

    this.products = []
  }

  ngOnInit():void{

    this.productService.getAll().subscribe({

        next:((data)=>{
          this.products=data
        })

        ,
        error:(error=>{
        })
    })
  }

  


  deleteProduct(productId: number) {
    this.productService.deleteItem(productId).subscribe({
      next: () => {
        this.products = this.products.filter(
          (product) => product.id != productId
        );
      

      },
      error: () => {},
    });
  }

}
