import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../shared/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private auth:UserAuthService) { }

  ngOnInit(): void {
    this.auth.removeStatusFromLs();
    this.auth.setLoggedIn(false);
  }

  studentClick(){
      this.router.navigate(['student-login'])
    }
  
  teacherClick(){
      this.router.navigate(['teacher-login'])
  }


}
