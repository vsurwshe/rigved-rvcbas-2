import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private authService:AuthService, private loginService:LoginService) { }

  setHeaders(){
    return new HttpHeaders({
       "Content-Type":"application/json",
       "Authorization": this.loginService.getToken()
     });
  }

  getBillList(firstIndex,lastIndex,serachTerm):Observable<any>{
    return this.authService.process("POST","bill/retriveData/"+firstIndex+"/"+lastIndex,{headers: this.setHeaders(),body:serachTerm})
  }

}
