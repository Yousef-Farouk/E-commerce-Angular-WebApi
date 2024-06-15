import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NavbarComponent,
    FooterComponent
  ],

  exports:[
    NavbarComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
