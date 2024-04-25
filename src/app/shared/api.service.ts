import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postStudent(data: any) {
    return this.http.post<any>("http://localhost:3000/studentsData", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getStudents() {
    return this.http.get<any>("http://localhost:3000/studentsData")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateStudent(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/studentsData/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteStudent(rollNo: number) {
    return this.http.delete<any>("http://localhost:3000/studentsData/" + rollNo)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getStudentByrollNo(id: number) {
    return this.http.get<any>("http://localhost:3000/studentsData/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getStudentByEmail(eVal: any): Observable<any> {
    let urlParam = new HttpParams().set('email', eVal);
    return this.http.get("http://localhost:3000/registeredStudents", { params: urlParam })
  }

  // getStudentBySearch(rolln: any): Observable<any> {
  //   let urlParam = new HttpParams().set('rollNo', rolln);
  //   //urlParam.append('name',name);
  //   return this.http.get("http://localhost:3000/studentsData", { params: urlParam });
  // }
  getStudentBySearch(rolln: any,date:any): Observable<any> {
    return this.http.get<any>("http://localhost:3000/studentsData?rollNo="+rolln
    +"&dob="+date )
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getTeacherByEmail(eVal: any): Observable<any> {
    let urlParam = new HttpParams().set('email', eVal);
    return this.http.get("http://localhost:3000/registeredTeachers", { params: urlParam })
  }
  getStudentByRollNo(rolln: any): Observable<any> {
    let urlParam = new HttpParams().set('rollNo', rolln);
    return this.http.get("http://localhost:3000/studentsData", { params: urlParam });
  }

  getStudentByEmailPass(eVal: any,pVal:any){
    return this.http.get<any>("http://localhost:3000/registeredStudents?email="+eVal
    +"&password="+pVal )
      .pipe(map((res: any) => {
        return res;
      }))
  }
}

