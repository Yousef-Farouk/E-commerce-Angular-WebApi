import { IProductToCart } from './../../models/IProductToCart';
import { productList } from './../../models/productList';
import { Iproduct } from './../../models/iproduct';
import { ActivatedRoute ,Router ,RouterLinkActive,RouterLink} from '@angular/router';
import { Component ,OnInit, Output ,EventEmitter, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {


  @Output() dataEmitter = new EventEmitter<string>();

  quantity : number = 1 ;

  quantityExceeded :boolean = false 

  product : Iproduct = {
    id:0,
    name : "" ,
    description : "" ,
    price:0,
    quantity:0,
    image : null,
    imageUrl : '',
    categoryId : 0 ,
  }

  productId : number = 0  ;

constructor(public router : Router,
  public ActivatedRoute : ActivatedRoute,
  public productService : ProductApiService,
  public cartService : CartService) {
  
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
          if(this.product.quantity == 0)
            {
              this.quantity = 0
            }
        
        }
      });
    }

    
  }

  increaseQuantity(productQuantity:number){

    if(productQuantity == 0 )
        return

    if(this.quantity == productQuantity  )
      this.quantityExceeded = true 
    else 
    {
      this.quantity++ 

    }


      console.log(this.quantityExceeded)
  }

  decreaseQuantity(productQuantity:number){

    if(this.quantity > 1 )
      {
        this.quantity-- 
        this.quantityExceeded = false
      }
     
  }

  addToCart(product:Iproduct){

    if(this.quantity == 0 )
        return 
    
    const productToCart : IProductToCart ={
      productId : product.id , 
      quantity : this.quantity ,
    }

    const decodedToken = JSON.parse(localStorage.getItem('decodedToken') as string)
    let userId = decodedToken.nameid
    this.cartService.AddProductToCart(productToCart,userId)


  }

}
