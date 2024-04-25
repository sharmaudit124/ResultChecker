import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentModel } from './add-record.model';
import { ApiService } from '../shared/api.service';
import { UserAuthService } from '../shared/user-auth.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {
  submitted = false;
  responseData !: any;
  addRecordForm: FormGroup = new FormGroup({
    rollNo: new FormControl(''),
    name: new FormControl(''),
    dob: new FormControl(''),
    score: new FormControl(''),
  });
  studentModelObj: StudentModel = new StudentModel();
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private api: ApiService, private auth: UserAuthService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.auth.setLoggedIn(true);
    this.auth.setUserStatus(true);
    this.addRecordForm = this.formBuilder.group(
      {
        rollNo: ['', [Validators.required]],
        name: ['', [Validators.required,Validators.pattern(`.*\\S.*[a-zA-z0-9 ]`)]],
        dob: ['', [Validators.required]],
        score: ['', [Validators.required]]
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.addRecordForm.controls;
  }
  backTeacherDashboard() {
    this.router.navigate(['teacher-dashboard'])
  }
  postStudentDetails() {
    
    this.studentModelObj.rollNo = this.addRecordForm.value.rollNo;
    this.studentModelObj.name = this.addRecordForm.value.name.trim();
    this.studentModelObj.dob = this.addRecordForm.value.dob;
    this.studentModelObj.score = this.addRecordForm.value.score;

    this.api.postStudent(this.studentModelObj)
      .subscribe({
        next: res => {
          this.addRecordForm.reset();
          this.toast.success({ detail: "Added", summary: 'Your Values are Added.', duration: 3000 });
          this.redirectToTeacherDashboard();
        },
        error: err => {
          this.toast.warning({ detail: "Check Your Connection!", summary: 'We are unable to connect with server.', duration: 5000 });
        }
      });

  }
  redirectToTeacherDashboard() {
    this.router.navigate(['teacher-dashboard']);
  }
  resetFormValue() {
    this.addRecordForm.reset();
    
  
  }

  checkforDuplicates() {
    this.api.getStudentByRollNo(this.addRecordForm.value.rollNo)
      .subscribe({
       
        next: res => {
          const student = res.find((a: any) => {
            this.responseData = a;
          });
        },
        complete: () =>{
          if(this.responseData!=null){
            this.toast.warning({ detail: "Duplicate Values!", summary: 'The record is not added.', duration: 4000 });
            this.addRecordForm.reset();
            this.responseData=null;
          }
          else{
            this.postStudentDetails();
          }
          },
        error: err => {
          //Nothing to Do Here
        }
      });
  }
  addNow() {
    this.submitted = true;
    if (this.addRecordForm.invalid) {
      return;
    }
    this.checkforDuplicates();
  }
}
