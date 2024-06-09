import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  get f(){
    return this.form.controls;
  }
  ValidateEmail=(email:string):boolean=>{
    var validRejex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRejex)){
     return true;
  
    }else{
     return false;
    }
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   
  }
  

  onSubmit(): void {
    this.isSubmitted = true;
    let user = this.form.getRawValue(); 

    if (user.name.trim() === '' || user.email === '' || user.password === '') {
      Swal.fire('please enter all the fields');
    }else if (this.form.invalid) {
      Swal.fire("Check Inputs", "Enter all input fields properly", "warning");
    } else if (!this.ValidateEmail(user.email)) {
      Swal.fire("Error", "Please enter a valid email", "error");
    } else {
      // Remove the redeclaration of 'user'
      this.http.post('http://localhost:3000/api/user/register', user, { withCredentials: true }).subscribe(
        () => {
          // localStorage.setItem('isUserLoggedIn','true');
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);          
          Swal.fire("Error", err.error.message, "error");
        }
      );
    }
  }
  
}
