import { ApiService } from './../../services/api.service';
import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ProductApiService } from '../../services/product-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../models/iproduct';
import { Icategory } from '../../models/icategory';
import { error } from 'console';
import { CategoryApiService } from '../../services/category-api.service';


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

  categories : Icategory[] = [];

  constructor(
    public route : Router,  
    public productService : ProductApiService,
    // public productService : ApiService<Iproduct>,
    public activatedRoute : ActivatedRoute,
    public categoryService : CategoryApiService
  )
  {

  }

  productForm = new FormGroup({

    name : new FormControl('',[]),
    description : new FormControl('',[]),
    quantity : new FormControl(0,[]),
    price : new FormControl(0,[]),
    image : new FormControl<File|null>(null),
    category : new FormControl('',[])
  })


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
          console.log(data);
          this.product = data 
          this.getName.setValue(this.product.name)
          this.getDescription.setValue(this.product.description)
          this.getQuantity.setValue(this.product.quantity)
          this.getPrice.setValue(this.product.price)
          this.getImage.setValue(this.product.image)
         // console.log(this.categories.find(c=> c.id == this.product.categoryId)?.name);
          let cat = this.categories.find(c=> c.id == this.product.categoryId)
          // console.log(cat.name? );
          this.getCategory.setValue(cat?.name || 'Choose Category')
        }
      }) 
    }

    this.categoryService.getAll().subscribe({

      next:(data)=>{
        console.log(data);
        this.categories = data
      }
      ,
      error:(error)=>{
        console.log(error);
      }
    })

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

        const formData = new FormData();
          formData.append('name', this.productForm.get('name')?.value || '');
          formData.append('description', this.productForm.get('description')?.value || '');
          formData.append('quantity',this.getQuantity.value?.toString() || '0');
          formData.append('price', this.getPrice.value?.toString() || '0');
         // formData.append('category', this.productForm.get('category')?.value || '');
         formData.append('image', this.productForm.get('image')?.value as File || null);

          this.productService.addNewProduct(formData).subscribe({
          next:()=>{
            console.log(this.productForm.value);
          },
          error:(error)=>{
            console.log(error);
          }
        })
      }

      else {

          console.log("product is edited");
          console.log(this.productForm.get('category')?.value);
          const formData = new FormData();
          formData.append('name',this.getName.value|| '');
          formData.append('description', this.getDescription.value|| '');
          formData.append('quantity',this.getQuantity.value?.toString() || '0');
          formData.append('price', this.getPrice.value?.toString() || '0');
          formData.append('categoryId', this.productForm.get('category')?.value || '');
          formData.append('image', this.productForm.get('image')?.value as File );

          this.productService.editProduct(this.productId,formData).subscribe({
            next:(data)=>{
              console.log(data);
            }
            ,
            error:(error)=>{
              console.log(error);
            }
          })
      }
    }

    else{
          
      console.log("form invalid");
    }
  }


  onFileSelected($event: any) {
    const inputElement = $event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    console.log(file);
    if (file) {
      this.productForm.controls['image'].setValue(file);
    } else {
      this.productForm.controls['image'].setValue(null); // Set to null if no file is selected
    }
  }
}
