import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from '../shared/user-auth.service';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../shared/api.service';


@Component({
  
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  responseData!: any;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private auth: UserAuthService, private toast: NgToastService, private api: ApiService) { }
  ngOnInit(): void {
    this.auth.removeStatusFromLs();
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
        ],
        password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern(".*\\S.*[a-zA-z0-9 ]")
          ]
        ]
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  loginStudent() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.api.getStudentByEmail(this.loginForm.value.email)
      .subscribe({
        next: res => {
          const student = res.find((a: any) => {
            this.responseData = a;
          });
          if (this.responseData != null) {
            if (this.responseData.email.toLowerCase() === this.loginForm.value.email.toLowerCase().trim() && this.responseData.password === this.loginForm.value.password) {
              this.auth.setUserStatus(true);
              this.toast.success({ detail: "Welcome", summary: 'You are Logged In...', duration: 4000 });
              this.loginForm.reset();
              this.router.navigate(['student-home-view'])
            }
            else {
              this.toast.warning({ detail: "WRONG Password!", summary: 'You have enterd wrong password.', duration: 5000 });
              this.loginForm.reset();
            }
          }
          else {
            this.toast.error({ detail: "Oops!!", summary: 'Invalid User...', duration: 3000 });
            this.loginForm.reset();
          }
        },
        error: err => {
          this.toast.warning({ detail: "Check Your Connection!", summary: 'We are unable to connect with server.', duration: 5000 });
        }
      }
      )
  }

  //using email and password both

  // loginStudent(){
  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   this.api.getStudentByEmailPass(this.loginForm.value.email,this.loginForm.value.password)
  //     .subscribe({
  //       next: res => {
  //         const student = res.find((a: any) => {
  //           this.responseData = a;
  //         });
  //         if (this.responseData != null) {
  //           if (this.responseData.email.toLowerCase() === this.loginForm.value.email.toLowerCase().trim() && this.responseData.password === this.loginForm.value.password.trim()) {
  //             this.auth.setUserStatus(true);
  //             this.toast.success({ detail: "Welcome", summary: 'You are Logged In...', duration: 4000 });
  //             this.loginForm.reset();
  //             this.router.navigate(['student-home-view'])
  //           }
  //           else {
  //             this.toast.warning({ detail: "WRONG Password!", summary: 'You have enterd wrong password.', duration: 5000 });
  //             this.loginForm.reset();
  //           }
  //         }
  //         else {
  //           this.toast.error({ detail: "Oops!!", summary: 'Invalid User...', duration: 3000 });
  //           this.loginForm.reset();
  //         }
  //       },
  //       error: err => {
  //         this.toast.warning({ detail: "Check Your Connection!", summary: 'We are unable to connect with server.', duration: 5000 });
  //       }
  //     }
  //     )
  // }
}
