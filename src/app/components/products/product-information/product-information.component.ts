import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-product-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.css'
})
export class ProductInformationComponent {

  selectedTab: string = 'description';

  @Input() productDescription = '';


  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
