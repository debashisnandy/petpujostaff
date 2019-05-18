import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { InvalidAuthComponent } from './invalid-auth.component';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class UserAuthService {

  durationInSeconds = 5;
  
  subject = new Subject<string>();

  private token= null;

    constructor(private firebaseAuth: AngularFireAuth,private router:Router,private snackBar: MatSnackBar){}

    login(email: string, password: string) {
        this.firebaseAuth
          .auth
          .signInWithEmailAndPassword(email, password)
          .then(value => {
            this.token = value.user.getIdToken();
            this.router.navigate(['/']);
            
          })
          .catch(err => {
            this.snackBar.openFromComponent(InvalidAuthComponent, {
              duration: this.durationInSeconds * 1000,
            });
          });
      }
    
      logout() {
        this.router.navigate(['/login']);
        this.firebaseAuth
          .auth
          .signOut();
      }

      
}