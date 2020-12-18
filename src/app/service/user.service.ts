import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService:AuthService, private loginService:LoginService) { }
  
  setHeaders(privateToken:boolean){
    if(privateToken){
      return new HttpHeaders({
        "Content-Type":"application/json",
        "Authorization": "Token "+this.loginService.getToken()
      });
    }else{
      return new HttpHeaders({
        "Content-Type":"application/json",
        "Authorization": this.loginService.getToken()
      });
    }
    
  }

  readProfile(accountId):Observable<any>{
    return this.authService.process("GET","private/read/"+accountId,{headers: this.setHeaders(true)})
  }

  changePassword(passwordBody):Observable<any>{
    return this.authService.process("POST","public/changePassword",{headers: this.setHeaders(false),body:passwordBody})
  }

  updateProfile(bodyData):Observable<any>{
    const {accountId, firstName, lastName, emailId }=bodyData
    return this.authService.process("GET","private/updateProfile/"+accountId+"/"+firstName+"/"+lastName+"/"+emailId,{headers: this.setHeaders(true)})
  }

}
