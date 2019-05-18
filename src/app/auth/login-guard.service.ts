import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, mergeMap, tap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class LoginGuard implements CanActivate {

    isTokanAvailable = true;
    subject = new Subject<boolean>();
    
    constructor(private userAuthService:UserAuthService,private router:Router,private firebaseAuth: AngularFireAuth){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        
        
        return this.firebaseAuth.authState.pipe(map(
            (auth) =>{
                if(!auth){
                    return true;
                }else{
                    this.router.navigate(['/main']);
                    return false;
                }
            }
        ),take(1));
        
        
    }

}