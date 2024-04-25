import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchedDataService } from '../shared/searched-data.service';
import { UserAuthService } from '../shared/user-auth.service';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student-home-view',
  templateUrl: './student-home-view.component.html',
  styleUrls: ['./student-home-view.component.css']
})
export class StudentHomeViewComponent implements OnInit {
  studentResultModel: any;
  submitted = false;
  findResultForm: FormGroup = new FormGroup({
    rollNO: new FormControl(''),
    dob: new FormControl(''),
  });
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private shared: SearchedDataService, private auth: UserAuthService, private toast: NgToastService, private api: ApiService) { }

  ngOnInit(): void {
    this.auth.setUserStatus(true);
    this.auth.setLoggedIn(true);
    this.findResultForm = this.formBuilder.group(
      {
        rollNo: ['', [Validators.required]],
        dob: ['', [Validators.required]]
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.findResultForm.controls;
  }
  clearForm() {
    this.findResultForm.reset();
  }
  // findMyResult(){
  //   this.submitted = true;
  //   if (this.findResultForm.invalid) {
  //     return;
  //   }
  //   this.api.getStudentBySearch(this.findResultForm.value.rollNo)
  //   .subscribe({
  //     next: res => {
  //       const student = res.find((a: any) => {
  //         this.studentResultModel=a;

  //       });
  //       if (this.studentResultModel!=null) {
  //         if(this.studentResultModel.rollNo==this.findResultForm.value.rollNo && this.studentResultModel.dob==this.findResultForm.value.dob){
  //         this.shared.setData(this.studentResultModel.rollNo,this.studentResultModel.name,this.studentResultModel.dob,this.studentResultModel.score);
  //         this.router.navigate(['student-result-view']);
  //         }
  //         else{
  //           this.toast.warning({ detail: "Invalid DOB Entered!", summary: 'You have enterd invalid value.', duration: 5000 });
  //             this.findResultForm.reset();     
  //         }
  //       }
  //       else {
  //         this.toast.error({detail:"Invalid Student!",summary:'Please,Try again with correct values',duration:3000});
  //         this.findResultForm.reset();
  //       }
  //     }
  //     ,error: err =>{
  //       this.toast.warning({detail:"Check Your Connection!",summary:'We are unable to connect with server.',duration:5000});
  //     }
  //   })
  // }
  findMyResult() {
    this.submitted = true;
    if (this.findResultForm.invalid) {
      return;
    }
    this.api.getStudentBySearch(this.findResultForm.value.rollNo, this.findResultForm.value.dob)
      .subscribe({
        next: res => {
          const student = res.find((a: any) => {
            this.studentResultModel = a;

          });
          if (this.studentResultModel != null) {
            this.shared.setData(this.studentResultModel.rollNo, this.studentResultModel.name, this.studentResultModel.dob, this.studentResultModel.score);
            this.router.navigate(['student-result-view']);
          }
          else {
            this.toast.error({ detail: "Invalid Student!", summary: 'Please,Try again with correct values', duration: 5000 });
            this.findResultForm.reset();
          }
        }
        , error: err => {
          this.toast.warning({ detail: "Check Your Connection!", summary: 'We are unable to connect with server.', duration: 5000 });
        }
      })
  }
}

