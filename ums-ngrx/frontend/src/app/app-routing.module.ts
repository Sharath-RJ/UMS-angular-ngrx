import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UsersListComponent } from './components/admin/user-list/user-list.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { DashboardComponent } from './components/admin/dashbord/dashbord.component';
import {  UserAuthGuardComponent} from './components/guards/user.auth.guard';
import { UserLoginGuard } from './components/guards/user.login.guard';
import { AdminAuthGuardComponent } from "./components/guards/admin.auth.guard";
import { AdminLoginGuard } from "./components/guards/admin.login.guard";


const routes: Routes = [
  {
    path:'user/login',component:UserLoginComponent,canActivate: [UserLoginGuard]
  },
  {
  path:'user/register',component:RegisterComponent,canActivate: [UserLoginGuard]
  },
  {
    path:'home',component:HomeComponent ,
  },
  {
    path:'user',component:HomeComponent,
  },
 
  {
    path:'user/profile',component:ProfileComponent,canActivate: [UserAuthGuardComponent]
  },
  {
    path:'',component:HomeComponent
  },
 {
       path: 'adminLogin', component: AdminLoginComponent , canActivate: [AdminLoginGuard]
  },
  { path: 'admin/dashboard', component: DashboardComponent ,canActivate: [AdminAuthGuardComponent]},
    { 
      path: 'admin/usersList', component: UsersListComponent,canActivate: [AdminAuthGuardComponent]
    },
    { 
      path: 'admin/editUser/:userId', component: EditUserComponent ,canActivate: [AdminAuthGuardComponent]
    },
    { 
      path: 'admin/createUser', component: CreateUserComponent,canActivate: [AdminAuthGuardComponent]
    },
    { path: 'admin', component: AdminLoginComponent, canActivate: [AdminLoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
