import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../shared/user-auth.service';
import { ApiService } from '../shared/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {
  teacherData !:any;
  public teacherLoginForm! : FormGroup
  constructor(private router: Router, private formBuilder: FormBuilder, private http:HttpClient , private auth:UserAuthService,private api : ApiService,private toast:NgToastService) { }
  submitted = false;
  ngOnInit(): void {
    this.auth.removeStatusFromLs();
    //form initialisation
    this.teacherLoginForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
        ],
        password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern(".*\\S.*[a-zA-z0-9 ]")
          ]
        ]
    })
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.teacherLoginForm.controls;
  }

  loginTeacher(){
    this.submitted = true;
    if (this.teacherLoginForm.invalid) {
      return;
    }
    this.api.getTeacherByEmail(this.teacherLoginForm.value.email)
    .subscribe({
      next: res => {
        const student = res.find((a: any) => {
          this.teacherData = a;
        });
        
        if(this.teacherData!=null){
          if(this.teacherData.email.toLowerCase()==this.teacherLoginForm.value.email.toLowerCase().trim() && this.teacherData.password==this.teacherLoginForm.value.password){
          this.auth.setUserStatus(true);
          this.toast.success({ detail: "Welcome", summary: 'You are Logged In...', duration: 4000 });
          this.teacherLoginForm.reset();
          this.router.navigate(['teacher-dashboard']);
          }
          else{
            this.toast.warning({ detail: "WRONG Password!", summary: 'You have enterd wrong password.', duration: 5000 });
            this.teacherLoginForm.reset();
          }
        }
        else{
          this.toast.error({ detail: "Oops!!", summary: 'Invalid User...', duration: 3000 });
          this.teacherLoginForm.reset();
        }},
        error: err => {
          this.toast.warning({ detail: "Check Your Connection!", summary: 'We are unable to connect with server.', duration: 5000 });
        }
      })
  }

}
