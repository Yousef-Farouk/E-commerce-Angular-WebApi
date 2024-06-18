import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive,Router,ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  role : string = ''
  constructor(private tokenService : TokenService,private route : Router) {




  }
  ngOnInit(): void {
    
    this.role = this.tokenService.getClaim("role")
   

  }

  hasToken():Boolean{

    if(localStorage.getItem('authToken'))
      return true 

    return false
    
  }


  logout(): void {
    localStorage.removeItem('authToken');
    this.route.navigate(["/login"])
  }


}
