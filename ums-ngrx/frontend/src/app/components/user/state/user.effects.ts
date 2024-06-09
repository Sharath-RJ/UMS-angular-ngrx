import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from 'src/app/components/user/state/user.service';
import { retreiveUsersSuccess, retrieveProfileSuccess, retrieveUsers, retrieveProfile } from '../state/user.action';
import { User } from 'src/app/models/userModel';
import { switchMap, map } from 'rxjs'

@Injectable()
export class userEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ){}

    loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveProfile), // Use retrieveProfile here
    
        switchMap(() => {
            // console.log('Before calling userService.loadProfile()');
            return this.userService.loadProfile().pipe(
                map(data => {
                    console.log('Hello from effect:',data);
                    return retrieveProfileSuccess({ userDetails: data as User });
                })
            );
        })
      
    )
  );

    loadAllUsers$ = createEffect( () => 
        this.actions$.pipe(
            ofType(retrieveUsers),
            switchMap( () => {
                return this.userService.laodUsers().pipe(
                    map((data) => retreiveUsersSuccess({allUsers: data as User[]}))
                )
            })
        )
    )
}