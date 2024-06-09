import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { hasFormErrors } from '../../../helpers/form.validation.helper';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  @Input() val: any

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }
  ValidateEmail = (email: string): boolean => {
    var validRejex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRejex)) {
      return true;
    } else {
      return false;
    }
  };

  onSubmit() {
    // const user = this.form.getRawValue()
    this.isSubmitted = true;
    // console.log(user,'user details that passed to back end');
    // console.log(this.form.controls,'Form controls');

    const user = this.form.getRawValue();
    if (user.name.trim() === '' || user.email === '' || user.password === '') {
      Swal.fire('please enter all the fields');
    } else if (this.form.invalid) {
      Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
    } else if (!this.ValidateEmail(user.email)) {
      Swal.fire(
        'Check Inputs',
        'Enter all input fields fields properly',
        'warning'
      );
    } else {
      this.http
        .post('http://localhost:3000/api/admin/createUser', user, {
          withCredentials: true,
        })
        .subscribe(
          () => this.router.navigate(['/admin/usersList']),
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
    }
  }
}