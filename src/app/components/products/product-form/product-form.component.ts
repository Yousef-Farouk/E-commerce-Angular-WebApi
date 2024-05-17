import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../models/iproduct';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})


export class ProductFormComponent implements OnInit {

  productId : number = 0 ;
  product : any ;

  productForm = new FormGroup({

    name : new FormControl('',[]),
    description : new FormControl('',[]),
    quantity : new FormControl('',[]),
    price : new FormControl('',[]),
    image : new FormControl('',[]),
    category : new FormControl('',[])
  })

  
  constructor(
    public route : Router,  
    public productService : ProductApiService,
    public activatedRoute : ActivatedRoute
  ){}


  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe({
      next:(params)=>{
        this.productId = params['id']
        this.getName.setValue('')
        this.getPrice.setValue(null)
        this.getQuantity.setValue(null)
        this.getDescription.setValue(null)
        this.getImage.setValue(null)
      },
    }) 

    if(this.productId != 0 ){

      this.productService.getProductById(this.productId).subscribe({
        next:(data)=>{
          this.product = data 
          this.getName.setValue(this.product.name)
          this.getDescription.setValue(this.product.description)
          this.getQuantity.setValue(this.product.quantity)
          this.getPrice.setValue(this.product.price)
          this.getImage.setValue(this.product.image)
          this.getCategory.setValue(this.product.category)
        }
      }) 
    }

  }


  get getName() {
    return this.productForm.controls['name'];
  }

  get getPrice(){

    return this.productForm.controls['price']
  }

  get getQuantity(){

    return this.productForm.controls['quantity']
  }

  get getDescription(){

    return this.productForm.controls['description']
  }

  get getCategory(){

    return this.productForm.controls['category']
  }

  get getImage(){
    return this.productForm.controls['image']
  } 

  productHandler(){

    if (this.productForm.status == 'VALID'){

      if(this.productId == 0 ){

        this.productService.addNewProduct(this.productForm.value).subscribe({
          next:()=>{
            console.log(this.productForm.value);
          }
        })
      }

      else {

          this.productService.editProduct(this.productId,this.productForm.value)
      }
    }

    else{
          
      console.log("form invalid");
    }
  }


}
