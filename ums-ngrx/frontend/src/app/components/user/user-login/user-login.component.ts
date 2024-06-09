import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';
// import * as AuthActions from 'src/app/states/auth/auth.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['', Validators.required, Validators.email ],
      password:['', Validators.required]
    })

    const isLoggedIn = localStorage.getItem('isULoggedIn');

    if (isLoggedIn) {
      console.log("user already logged!!")

      this.router.navigate(['user/profile']);
    }

  }
  
  get f(){
    return this.form.controls;
  }
  
  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true; // There are form validation errors
    }
    return false; // No form validation errors
  }

  onSubmit(): void {
    this.isSubmitted = true;
    let user = this.form.getRawValue();

    if(user.username === '' || user.password === '') {
      Swal.fire('Please enter all the fields', 'Warning!');
    } else if (this.hasFormErrors(this.form)) {
      Swal.fire("Check Inputs", 'Enter all input fields properly', "warning");
    } else {
      const user = this.form.getRawValue();
      this.http.post('http://localhost:3000/api/user/login', user, { withCredentials: true }).subscribe(
        (res) => {
          console.log("Response is ::",res);
          localStorage.setItem('isUserLoggedIn','true');
          this.router.navigate(['user/profile']);
        },
        (err) => {
          Swal.fire("Error", err.error.message, "error");
        }
      );
    }
  }
}