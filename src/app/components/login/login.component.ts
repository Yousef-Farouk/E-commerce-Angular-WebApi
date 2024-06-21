import { TokenService } from './../services/token.service';
import { Component, OnInit } from '@angular/core';
import { ILogin } from '../models/ilogin';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginData: ILogin = {
    email: '',
    password: ''
  };

  constructor(private authService : AuthService,private router:Router,private tokenService : TokenService) {

  }
  ngOnInit(): void {
    
    
  }


  

  onSubmit(){

    this.authService.login(this.loginData).subscribe(success => {
        if (success) {
            this.router.navigate(['/home']); 
            const decodedToken = this.tokenService.decodeToken();
            console.log(decodedToken.nameid)
          localStorage.setItem('decodedToken',JSON.stringify(decodedToken))
        } else {
            alert('Login failed');
        }
    });
}
}
