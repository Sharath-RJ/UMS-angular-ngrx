import { userProfile, User, } from 'src/app/models/userModel';

export interface appProfile {
  userdetails: User;
}

export interface appUsers {
  allusers:  User[];
}