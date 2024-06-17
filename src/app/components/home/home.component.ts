import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { BannerComponent } from '../banner/banner.component';
import { FooterComponent } from '../footer/footer.component';
import { OverviewComponent } from '../overview/overview.component';
import { ProductsComponent } from '../products/products.component';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,SliderComponent,BannerComponent,FooterComponent,OverviewComponent,ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  constructor() {


  }
  ngOnInit(): void {
  

  }

}
