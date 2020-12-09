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
  
  setHeaders(){
    return new HttpHeaders({
       "Content-Type":"application/json",
       "Authorization": this.loginService.getToken()
     });
  }

  changePassword(passwordBody):Observable<any>{
    return this.authService.process("POST","public/changePassword",{headers: this.setHeaders(),body:passwordBody})
  }

}
