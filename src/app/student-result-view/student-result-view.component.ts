import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchedDataService } from '../shared/searched-data.service';
import { UserAuthService } from '../shared/user-auth.service';

@Component({
  selector: 'app-student-result-view',
  templateUrl: './student-result-view.component.html',
  styleUrls: ['./student-result-view.component.css']
})
export class StudentResultViewComponent implements OnInit {

  constructor(private router : Router,private shared :SearchedDataService, private auth: UserAuthService) { }

  ngOnInit(): void {
    this.auth.setUserStatus(true);
    this.auth.setLoggedIn(true);
  }

back(){
  this.router.navigate(['student-home-view']);
}
getRollNoVal(){
  return localStorage.getItem('sRollNo');
}
getNameVal(){
  return localStorage.getItem('sName');
}
getDobVal(){
  return localStorage.getItem('sDob');
}
getScoreVal(){
  return localStorage.getItem('sScore');
}

}
