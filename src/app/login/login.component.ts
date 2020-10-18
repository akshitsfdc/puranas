import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private firebaseAuth: AuthService) { }

  ngOnInit(): void {

    
    this.firebaseAuth.getUser()
    .then(user => {
      if(user){
        this.navigateToHome();
      }
    });

    this.loginForm = new FormGroup({
      emailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  get emailAddress(){
    return this.loginForm.get('emailAddress');
  }
  
  get password(){
    return this.loginForm.get('password');
  }


  onSubmit(f){

    if(f.valid){
      let userName:string = (this.emailAddress.value as string).trim();
      let password:string = (this.password.value as string).trim();
  
      if(userName.length <= 0 || password.length <= 0){
        alert("Invalid username or password!");
        return;
      }
      this.firebaseAuth.signIn(userName, password)
      .then(val => {
        this.navigateToHome();
        console.log("Login success!");
      })
      .catch(error => {
        console.log("Login failed!");
      });
    }
    
  }

  private navigateToHome():void{
    this.router.navigate(['home']);
  }

}
