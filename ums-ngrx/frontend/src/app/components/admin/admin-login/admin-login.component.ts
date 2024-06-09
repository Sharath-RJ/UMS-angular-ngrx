import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { hasFormErrors } from '../../../helpers/form.validation.helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      email: ['', Validators.required, Validators.email ],
      password: ['', Validators.required ]
    })
  }

  validateEmail = (email: any) => {
    // Regular expression pattern for email validation
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.form.controls);
    const admin = this.form.getRawValue();
    if (admin.email === '' || admin.password === '') {
      Swal.fire('All fields are required', 'Warning!');
    } else if (!this.validateEmail(admin.email)) {
      Swal.fire('Please enter a valid email', 'Warning!');
    } else{
      console.log(admin);
      this.http.post('http://localhost:3000/api/admin/login',admin,{withCredentials:true}).subscribe(
        () => {
          localStorage.setItem('isAdminLoggedIn','true');
          this.router.navigate(['/admin/usersList'])
        },
        (err)=>{
          console.log(err);
          Swal.fire("Error",err.error.message,"error");
        }
      )
    }
  }

  @Input() val: string;
}