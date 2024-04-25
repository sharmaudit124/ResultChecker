import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchedDataService {
  constructor() { }
  setData(rollNo: string,name: string,dob: string,score: string){
   localStorage.setItem('sRollNo',rollNo);
   localStorage.setItem('sName',name);
   localStorage.setItem('sDob',dob);
   localStorage.setItem('sScore',score);
  }
}
