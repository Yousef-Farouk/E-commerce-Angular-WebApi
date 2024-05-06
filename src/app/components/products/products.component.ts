import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  search_flag :boolean = false ;
  filter_flag :boolean = false ;

  displaySearch()
  {
      this.search_flag = !this.search_flag;
  }

  displayFilter()
  {
    this.filter_flag = !this.filter_flag
  }
}
