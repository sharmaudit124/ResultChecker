import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserAuthService } from '../shared/user-auth.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  studentsData !: any;
  
  constructor(private router: Router,private api : ApiService, private auth : UserAuthService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.auth.setUserStatus(true);
    this.auth.setLoggedIn(true);
    this.getAllStudents();
  }
  addRecord(){
    this.router.navigate(['add-record'])
  }
  getAllStudents(){
    this.api.getStudents()
    .subscribe(res =>{
      this.studentsData=res;
    })
  }
  deleteStudent(row:any){
    this.api.deleteStudent(row.id)
    .subscribe(res =>{
      this.toast.success({ detail: "Deleted", summary: 'Your Data is Deleted.', duration: 3000 });
      this.getAllStudents();
    })
    
  }
  getNoOfRows(){
    return this.studentsData.length;
  }
  editStudent(){
    //this.auth.setIsEditPressedOnce();
  }
}
