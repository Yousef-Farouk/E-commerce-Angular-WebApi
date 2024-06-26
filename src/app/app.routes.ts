import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import { Routes, CanActivate } from '@angular/router';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductTableComponent } from './components/products/product-table/product-table.component';

export const routes: Routes = [

    {path:'products/:id/add' ,component:ProductFormComponent},
    {path:'dashboard/products',component:ProductTableComponent,canActivate:[AuthGuard]},
    {path:'products/:id',component:ProductInfoComponent,canActivate:[AuthGuard]},
    {path:'products',component:AllProductsComponent,canActivate:[AuthGuard]},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'cart',component:ShoppingCartComponent,canActivate:[AuthGuard]}
];
