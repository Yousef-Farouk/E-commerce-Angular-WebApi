import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';
import { ProductInformationComponent } from '../products/product-information/product-information.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,ProductDetailsComponent,ProductInformationComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent {

  
}
