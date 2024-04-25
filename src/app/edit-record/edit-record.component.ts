import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserAuthService } from '../shared/user-auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit {
  editRecordForm: FormGroup = new FormGroup({
    rollNo: new FormControl(''),
    name: new FormControl(''),
    dob: new FormControl(''),
    score: new FormControl(''),
  });
  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private api: ApiService, private r: Router, private auth: UserAuthService, private toast: NgToastService) { }
  submitted = false;
  flag !: any;
  ngOnInit(): void {
    this.auth.setUserStatus(true);
    this.auth.setLoggedIn(true);
    this.api.getStudentByrollNo(this.router.snapshot.params['id'])
      .subscribe((res => {
        console.log(res);
        this.editRecordForm = new FormGroup({
          rollNo: new FormControl(res['rollNo']),
          name: new FormControl(res['name']),
          dob: new FormControl(res['dob']),
          score: new FormControl(res['score']),
        });
      }))
  }
  get f(): { [key: string]: AbstractControl } {
    return this.editRecordForm.controls;
  }
  resetFormValue() {
    this.editRecordForm.controls['name'].reset();
    this.editRecordForm.controls['dob'].reset();
    this.editRecordForm.controls['score'].reset();

  }
  updateStudentValue() {
    this.submitted = true;
    //this.checkValidations();
    if (this.editRecordForm.invalid) {
      return;
    }
    this.api.updateStudent(this.editRecordForm.value, this.router.snapshot.params['id'])
      .subscribe({
        next: res => {
          this.toast.success({ detail: "Updated", summary: 'Your Values are updated.', duration: 3000 });
          this.redirectToTeacherDashboard();
        },
        error: err => {
          this.toast.warning({ detail: "Check Your Connection!", summary: 'We are unable to connect with server.', duration: 5000 });
        }
      });
  }
  redirectToTeacherDashboard() {
    this.r.navigate(['teacher-dashboard']);
  }
 getPreviousValues(){
  this.api.getStudentByrollNo(this.router.snapshot.params['id'])
  .subscribe((res => {
    console.log(res);
    this.editRecordForm = new FormGroup({
      rollNo: new FormControl(res['rollNo']),
      name: new FormControl(res['name']),
      dob: new FormControl(res['dob']),
      score: new FormControl(res['score']),
    });
  }))
 }
 checkValidations(){
  this.editRecordForm = this.formBuilder.group(
    {
      rollNo: ['', []],
      name: ['', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
      dob: ['',[Validators.required]],
      score: ['', [Validators.required]]
    });
 }
}
