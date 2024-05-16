import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductTableComponent } from './components/products/product-table/product-table.component';

export const routes: Routes = [

    {path:'products/add' ,component:ProductFormComponent},
    {path:'products/all',component:ProductTableComponent}
];
