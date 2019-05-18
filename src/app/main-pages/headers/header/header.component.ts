import { Component, ViewChild } from '@angular/core';
import { UserAuthService } from 'src/app/auth/user-auth.service';
//import { UserAuthService } from 'src/app/auth/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('drawer') draw;
  constructor(private userAuthService:UserAuthService) {}

  onLogOut(){
    this.userAuthService.logout();
  }

}
