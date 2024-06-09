import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/userModel';

@Injectable()
export class appService {
  getUserProfile() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/adminUsers', {
      withCredentials: true,
    });
  }

  loadProfile() {
    console.log("loadprofile() is called");
    
    return this.http.get('http://localhost:3000/api/user/profile', {
      withCredentials: true,
    });
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  laodUsers(){
    return this.http.get('http://localhost:3000/api/admin/usersList',{ withCredentials: true });
  }

  loadProfile(){

    const profileData =  this.http.get('http://localhost:3000/api/user/profile',{ withCredentials: true });
    // console.log(profileData,'profiledata from service');
    return profileData
    
  }
}