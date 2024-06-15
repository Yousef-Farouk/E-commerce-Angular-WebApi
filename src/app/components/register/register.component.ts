import { RegisterService } from './../services/register.service';
import { Component, OnInit } from '@angular/core';
import { IRegister } from '../models/Iregister';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { PassThrough } from 'stream';
import { CommonModule } from '@angular/common';
import { error } from 'console';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  submitted = false;
  serverErrorMessage: string = '';


registerData:IRegister={
  username:'',
  email:'',
  password:'',
  confirmpassword:''
}

  constructor(private registerService :RegisterService,private router :Router,private formBuilder:FormBuilder) {}


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmpassword:['',Validators.required],
      acceptTerms:[false,Validators.requiredTrue]
    },{
      validator : this.mustMatch('password','confirmpassword')
    })
  }


  get rf() {
    return this.registerForm.controls;
  }

  mustMatch(password : string , confirmPassword:string){

    return (formGroup:FormGroup)=>{

      const passwordControl = formGroup.controls[password]
      const confirmPasswordControl = formGroup.controls[confirmPassword] 

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return {passwordMismatch: true };

      } else {
        confirmPasswordControl.setErrors(null);
        return null
      }
    };

  }



onSubmit(){

  this.submitted = true

  this.serverErrorMessage = ''
  if (this.registerForm.invalid) {
    return;
  }

  this.registerData = this.registerForm.value;


  this.registerService.Register(this.registerData).subscribe(
    response=>{
      if(response)
        this.router.navigate(['/home'])
      else
      {
        alert('register failed')
      }
    },

    error=>{
        this.serverErrorMessage = error
    }
  )

}



}
