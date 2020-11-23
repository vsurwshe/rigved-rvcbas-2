import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  firstIndex;
  lastIndex;
  constructor(private authService:AuthService, private loginService:LoginService) {
    this.firstIndex=0;
    this.lastIndex=20;
  }

  setHeaders(){
    return new HttpHeaders({
       "Content-Type":"application/json",
       "Authorization": this.loginService.getToken()
     });
  }

  getCompanyDetails(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/companyDetailsSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarColorSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carColorSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarInterriorSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carIntColorSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarCategorySerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carCategorySearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarBrandSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carBrandSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarSubTypeBrandSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carBrandSubTypeSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getCostEmpolyeeById(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/costEmployIdSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getTravelDataById(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/travelIdSearch"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getCostCenterSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/costCenterSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getDriverSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/driverSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  getBookingSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/bookingSearch/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

  saveCompany(serachTerm):Observable<any>{
    return this.authService.process("POST","masterdata/addCompany/"+this.firstIndex+"/"+this.lastIndex+"/"+serachTerm,{headers: this.setHeaders()})
  }

}
