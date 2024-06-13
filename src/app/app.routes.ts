import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductTableComponent } from './components/products/product-table/product-table.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [

    {path:'products/:id/add' ,component:ProductFormComponent},
    {path:'products/:id',component:ProductDetailsComponent},
    {path:'products/all',component:ProductTableComponent},
    {path:'products',component:ProductsComponent},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent}
];
