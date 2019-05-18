import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../auth/user-auth.service';
import { FirestoreStorageService } from "../firebase-cloudstoredb/firestore-storage.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide = true;

  @ViewChild('f') signupForm: NgForm;

  constructor(private userAuthService:UserAuthService) { }

  ngOnInit() {
    
  }

  onSubmit(){
    this.userAuthService.login(this.signupForm.value.email,this.signupForm.value.password);
    
  }
}
