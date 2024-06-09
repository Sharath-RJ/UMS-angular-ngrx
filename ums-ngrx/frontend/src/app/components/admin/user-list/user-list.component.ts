     import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
// import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/models/userModel';
import { retrieveUsers } from 'src/app/components/user/state/user.action';
import { usersSelector } from 'src/app/components/user/state/user.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {

  filteredUsers: User[];
  users: User[];
  searchText: string;

  constructor(
    private http: HttpClient,
    private store: Store<{allUsers:User[]}>,
    private router: Router,
    private sweetAlertService: SweetAlert2LoaderService
  ){}
    
  userData$ = this.store.pipe(select(usersSelector));

  ngOnInit(): void {
    this.store.dispatch(retrieveUsers())
    this.userData$.subscribe((data:User[]) => {
      console.log(data);      
      this.users = data;
      this.filteredUsers = [...data];
    });

  }

  editUser(userId:string){
    this.router.navigate(['/admin/editUser',userId])
  }

  confirmDelete(userId:string){

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.post(`http://localhost:3000/api/admin/deleteUser/${userId}`,{},{withCredentials: true})
        .subscribe(
          () => {
            this.store.dispatch(retrieveUsers())
          },
          (err) => {
            this.router.navigate(['/admin'])
          }
        )

        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        );
      }
    });


  }

  search(): void {

    if (!this.searchText) {
      this.filteredUsers = [...this.users];
      return;
    }  
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onLogout(){
    this.http.post('http://localhost:3000/api/admin/logout',{},{ withCredentials:true }).subscribe(
      () => {
        localStorage.removeItem('isAdminLoggedIn')
        this.router.navigate(['/admin'])
      }
    );
  }


}