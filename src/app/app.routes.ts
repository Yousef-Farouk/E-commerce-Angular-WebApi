import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import { Routes, CanActivate } from '@angular/router';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductTableComponent } from './components/products/product-table/product-table.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    {path:'products/:id/add' ,component:ProductFormComponent},
    {path:'products/:id',component:ProductInfoComponent},
    {path:'products/all',component:ProductTableComponent},
    {path:'products',component:AllProductsComponent,canActivate:[AuthGuard]},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
];
