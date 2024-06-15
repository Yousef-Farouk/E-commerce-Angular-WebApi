import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsComponent } from '../products/products.component';
import { OverviewComponent } from '../overview/overview.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,ProductsComponent,OverviewComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {

}
