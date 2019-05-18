
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, CanLoad, UrlSegment, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, mergeMap, tap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreStorageService } from 'src/app/firebase-cloudstoredb/firestore-storage.service';

@Injectable()
export class ReceivedOrderAuthGuard implements CanActivate {
    
    subject = new Subject<boolean>();
    isTokanAvailable = false;
    constructor(private firebaseStorageRefService:FirestoreStorageService,
        private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        
        return this.firebaseStorageRefService.fetchIsOrderActive().pipe(map(
            (publish) =>{
                if(publish){
                    return true;
                }else{
                    this.router.navigate(['/main/publish']);
                    return false;
                }
            }
        ),take(1));
    }

}