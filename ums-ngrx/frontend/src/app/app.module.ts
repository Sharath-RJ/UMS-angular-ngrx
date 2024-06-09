import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { profileReducer, usersReducer } from './components/user/state/user.reducer';
import { appService } from './components/user/state/user.service'; 
import { UserAuthGuardComponent} from './components/guards/user.auth.guard'
import { HomeComponent } from './components/user/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { DashboardComponent } from './components/admin/dashbord/dashbord.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { UsersListComponent } from './components/admin/user-list/user-list.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './components/user/state/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    UserLoginComponent,
    AdminLoginComponent,
    CreateUserComponent,
    DashboardComponent,
    EditUserComponent,
    UsersListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      allUsers: usersReducer,
      userdetails: profileReducer
    }),
    EffectsModule.forRoot([userEffects]),
    SweetAlert2Module.forRoot(),
    
  
  ],
  providers: [appService, UserAuthGuardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
