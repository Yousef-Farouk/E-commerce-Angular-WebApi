import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { BannerComponent } from './components/banner/banner.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductInformationComponent } from './components/products/product-information/product-information.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductTableComponent } from './components/products/product-table/product-table.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SliderComponent,BannerComponent,OverviewComponent,ProductsComponent,FooterComponent,ProductDetailsComponent,ShoppingCartComponent,ProductInformationComponent,LoginComponent,RegisterComponent,ProductTableComponent,ProductFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Coza Store';
}
