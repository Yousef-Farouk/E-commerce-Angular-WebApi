import { CommonModule } from '@angular/common';
import { Component,Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../models/Ireview';
import { Router,ActivatedRoute } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-information',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.css'
})

export class ProductInformationComponent implements OnInit {


  rating: number = 0;

  selectedTab: string = 'description';

  userReview : string = ''

  productId = 0

  userId : string = ''

  userName:string = ''
  @Input() productDescription = '';

  reviews :IReview[] = [] ;


  constructor(public reviewService:ReviewService,public activateRoute:ActivatedRoute,public tokenService:TokenService) {


  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe({
      next:(params)=>{
        this.productId = params['id']
      }
    })


    this.reviewService.getProductReviews(this.productId).subscribe({
      next:(data)=>{
        this.reviews = data
      }
    }

    )

   this.userId = this.tokenService.getClaim("nameid")
   this.userName = this.tokenService.getClaim("given_name")

  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  onSubmit(event : Event){

    const review : IReview = {
      feedback :this.userReview,
      rating : this.rating,
      productId :this.productId ,
      userId:this.userId,
      userName:this.userName,
      userImage:null,
       
    } 

    this.reviews.push(review)

    
    this.reviewService.addItem(review).subscribe({
      next:(data)=>{
          
      }
    })
    // event.stopPropagation()
    // event.preventDefault()
    
    // console.log(this.userReview)

  }

  fillStars(starCount: number): void {
    this.rating = starCount;
  }
  
  setRating(starCount: number): void {
    if (this.rating === starCount) {
      this.rating = starCount - 1; 
    } else {
      this.rating = starCount; 
    }
  }
 
}
