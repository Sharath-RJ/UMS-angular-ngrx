import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  UserName: any;
  email: any;
  user_id: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.UserName,
      email: this.email,
    });

    this.user_id = this.route.snapshot.paramMap.get('userId');
    console.log(this.user_id, 'user id got');
    this.getUser(this.user_id);
  }

  onSubmit() {
    const user = this.form.getRawValue();
    console.log('this.email:', this.email);
    user.email = this.email;
    
    if (user.name === '') {
      Swal.fire("field can't be empty", 'warning!');
    } else if (user.name === null) {
      Swal.fire('No changes made', 'warning!');
    } else if (user.name === this.UserName) {
      Swal.fire('No changes made', 'warning!');
    } else {
      user.userId = this.user_id; 
      this.http
        .post('http://localhost:3000/api/admin/editUser', user, { withCredentials: true })
        .subscribe(
          () => {
            this.router.navigate(['admin/usersList']);
            Swal.fire("User name edited successfully", "Success!")
          },
          (err) => {
            Swal.fire(err.error.message, '!Error');
          }
        );
    }
  }

  getUser(user_id: string) {  
    this.http
      .get(
        `http://localhost:3000/api/admin/getUser/${user_id}`,        
        {
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        // console.log(res, 'get user for edit');
        this.UserName = res.name;
        this.email = res.email;
      });
  }
}