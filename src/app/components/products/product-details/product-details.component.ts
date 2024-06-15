import { productList } from './../../models/productList';
import { Iproduct } from './../../models/iproduct';
import { ActivatedRoute ,Router ,RouterLinkActive,RouterLink} from '@angular/router';
import { Component ,OnInit, Output ,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {


  @Output() dataEmitter = new EventEmitter<string>();


  product : Iproduct = {
    id:0,
    name : "" ,
    description : "" ,
    price:0,
    quantity:0,
    image : null,
    imageUrl : '',
    categoryId : 0 ,
    // couponId : number

  }

  productId : number = 0  ;

constructor(public router : Router,
  public ActivatedRoute : ActivatedRoute,
  public productService : ProductApiService) {
  
  }
  
  ngOnInit(): void {

    this.ActivatedRoute.params.subscribe({
      next:(params)=>{
        this.productId = params['id']
      }
    })

    if(this.productId != 0 ){

      this.productService.getById(this.productId).subscribe({
        next:(data)=>{
          this.product = data 
          this.dataEmitter.emit(this.product.description)
        }
      });
    }

  }

}
