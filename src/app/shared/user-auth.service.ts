import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
loggedIn !: boolean;
userStatus !: boolean;
  constructor(private http: HttpClient) { }

getValue(){
  return this.loggedIn;
}
removeStatusFromLs(){
localStorage.removeItem('token');
}
setLoggedIn(val: boolean){
this.loggedIn=val;
}

setUserStatus(val:boolean){
if(val){
  localStorage.setItem('token','yes');
}
// }else{
//   localStorage.setItem('token','no');
// }
this.userStatus=val;
}
getUserStatus(){
  return this.userStatus;
}
checker(){
  if(localStorage.getItem('token')=='yes'){
    return true;
  }
  else{
    this.removeStatusFromLs();
    return false;
  }
}
// setIsEditPressedOnce(){
//   localStorage.setItem('edit','yes');
// }
// getIsEditPressedOnce(){
//   return localStorage.getItem('edit');
// }
}
