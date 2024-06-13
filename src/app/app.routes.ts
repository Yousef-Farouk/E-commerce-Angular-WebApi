import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductTableComponent } from './components/products/product-table/product-table.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';

export const routes: Routes = [

    {path:'products/:id/add' ,component:ProductFormComponent},
    {path:'products/:id',component:ProductDetailsComponent},
    {path:'products/all',component:ProductTableComponent},
    // {path:'home',component:BannerComponent,children:[
    //     {
    //         path:'aux',
    //         component:SliderComponent,
    //         outlet:'aux'
    //     }
    // ]},
    {path:'products',component:ProductsComponent}

];
