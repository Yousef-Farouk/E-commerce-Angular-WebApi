import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {


  
  constructor(private router :Router) {
    

    
  }


  navigateToProducts(category:string){

    this.router.navigate(['/products'],{queryParams:{category:category}})
  }
}
