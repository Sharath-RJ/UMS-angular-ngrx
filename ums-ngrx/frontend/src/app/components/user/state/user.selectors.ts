import { createSelector } from "@ngrx/store";
import { User, appUsers, userProfile } from "src/app/models/userModel";
import { appProfile } from "./user.state";


export const profileRootSelector = (state:appProfile) => state.userdetails

export const userProfileSelector = createSelector(
    profileRootSelector,
    (userDetails:User) => {
      console.log(userDetails,'userDetails from selector'); 
        return userDetails
    }
)


export const userRootSelector = (state:appUsers)=> state.allUsers;
export const usersSelector = createSelector(
  userRootSelector,
  (allusers:User[])=>{
    console.log(allusers,'allusers from selector');
    return [...allusers]
  }
)