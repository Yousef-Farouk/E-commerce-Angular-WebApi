import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module'; // Import your shared module
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    SharedModule // Add your shared module here
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}