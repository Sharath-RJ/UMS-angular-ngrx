import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/userModel";
import { retreiveUsersSuccess, retrieveProfileSuccess } from "../state/user.action";
import { init } from "@emailjs/browser";
// import { state } from "@angular/animations";


export const userInitialState: User = {
    _id: "",
    name: "",
    email: "",
    password: "",
    image: ""
}

const _ProfileReducer = createReducer(
    userInitialState,
    on(retrieveProfileSuccess, (state,{userDetails}) => {
        console.log(userDetails,'userDetails from reducer');
        return userDetails
    })
)

export function profileReducer(state:any, action: any){
    return _ProfileReducer(state, action)
}

//------------------------------------------------------------//

export const initialState: User[] = [];

const _UsersReducer = createReducer(
    initialState,
    on(retreiveUsersSuccess, (state, {allUsers}) => {
        return [...allUsers]
    })
);

export function usersReducer(state: User[] = initialState, action: any) {
    return _UsersReducer(state, action);
}

