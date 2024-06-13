import { Component } from '@angular/core';
import { ILogin } from '../models/ilogin';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginData: ILogin = {
    email: '',
    password: ''
  };

  constructor(private authService : AuthService,private router:Router) {}


  

  onSubmit() {

    console.log(this.loginData.email , this.loginData.password);
    this.authService.login(this.loginData).subscribe(success => {
        if (success) {
            this.router.navigate(['/home']); // Navigate to the home page or dashboard
        } else {
            alert('Login failed');
        }
    });
}
}
