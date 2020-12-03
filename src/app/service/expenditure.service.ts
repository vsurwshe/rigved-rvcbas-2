import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  constructor(private authService:AuthService, private loginService:LoginService) { }

  setHeaders(){
    return new HttpHeaders({
       "Content-Type":"application/json",
       "Authorization": this.loginService.getToken()
     });
  }

  getExpenseListByDriver(firstIndex, lastIndex,driverId,startDate,endDate):Observable<any>{
    return this.authService.process("GET","expenditure/searchByDriver/"+firstIndex+"/"+lastIndex+"/"+driverId+"/"+startDate+"/"+endDate,{headers: this.setHeaders()});
  }

  getExpenseListConsaliate(firstIndex, lastIndex, formDate, endDate):Observable<any>{
    if(formDate == null && endDate == null){
      return this.authService.process("GET","expenditure/expList/"+firstIndex+"/"+lastIndex,{headers: this.setHeaders()})
    }else{
      return this.authService.process("GET","expenditure/expList/"+firstIndex+"/"+lastIndex+"/"+formDate+"/"+endDate,{headers: this.setHeaders()})
    }
  }

  getExpenseList(firstIndex, lastIndex, status):Observable<any>{
    return this.authService.process("GET","expenditure/allExpList/"+firstIndex+"/"+lastIndex+"/"+status,{headers: this.setHeaders()})
  }
}
