import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private loginService: LoginService, private authService:AuthService) { }

  setHeaders(){
    return new HttpHeaders({
       "Content-Type":"application/json",
       "Authorization": this.loginService.getToken()
     });
  }

  saveCustomer(customerData):Observable<any>{
    return this.authService.process("POST","file/userSignup/",{headers: this.setHeaders(), body:customerData})
  }
 
}
