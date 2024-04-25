import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../shared/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route : Router , private auth : UserAuthService) { }

  ngOnInit(): void {
    
  }
home(){
this.route.navigate(['/']);
this.auth.removeStatusFromLs();
//  this.auth.setLoggedIn(false);
//   this.auth.setUserStatus(false);
}
ifTrue(){
return this.auth.getValue();
}
userIsNull(){
  this.auth.setUserStatus(false);

}
logOutNow(){
  this.route.navigate(['/']);
  this.auth.removeStatusFromLs();
  this.auth.setLoggedIn(false);
  this.auth.setUserStatus(false);
  
}
}
