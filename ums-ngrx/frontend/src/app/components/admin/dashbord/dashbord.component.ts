import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { User } from 'src/app/models/userModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashboardComponent implements OnInit {

  adminName : string;

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/admin/active',{ withCredentials: true })
    .subscribe(
      (res: any) => {        
        console.log(res);        
        this.adminName = res.name;
      },
      (err) => this.router.navigate(['http://localhost:3000/api/admin'])
      
    )
  }
}