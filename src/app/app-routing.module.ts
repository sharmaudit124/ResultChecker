import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {StudentLoginComponent} from './student-login/student-login.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { StudentHomeViewComponent } from './student-home-view/student-home-view.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { StudentResultViewComponent } from './student-result-view/student-result-view.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

{
  path:'home',
  component:HomeComponent
},
{
  path:'',
  redirectTo:'/home',
  pathMatch:'full'
},
{
  path:'student-login',
  component:StudentLoginComponent
},
{
path:'teacher-login',
component:TeacherLoginComponent
},
{
  path:'student-home-view',
  canActivate : [AuthGuard],
  component:StudentHomeViewComponent
},
{
  path:'teacher-dashboard',
  canActivate : [AuthGuard],
  component:TeacherDashboardComponent
},
{
  path:'add-record',
   canActivate : [AuthGuard],
  component:AddRecordComponent
},
{
  path:'edit-record/:id',
   canActivate : [AuthGuard],
  component:EditRecordComponent
},
{
  path:'student-result-view',
   canActivate : [AuthGuard],
  component:StudentResultViewComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
