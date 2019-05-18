import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, CanLoad, UrlSegment, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, mergeMap, tap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthGuard implements CanActivate {
    
    subject = new Subject<boolean>();
    isTokanAvailable = false;
    constructor(private userAuthService:UserAuthService,private router:Router,private firebaseAuth: AngularFireAuth){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        

        return this.firebaseAuth.authState.pipe(map(
            (auth) =>{
                if(!auth){
                    this.router.navigate(['/login']);
                    return false;
                }else{
                    return true;
                }
            }
        ),take(1));
    }

}