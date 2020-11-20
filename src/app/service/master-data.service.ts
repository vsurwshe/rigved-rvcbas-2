import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private authService:AuthService, private loginService:LoginService) { }

  setHeaders(){
    return new HttpHeaders({
       "Content-Type":"application/json",
       "Authorization": this.loginService.getToken()
     });
  }

  getCompanyDetails(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/companyDetailsSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarColorSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carColorSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarInterriorSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carIntColorSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarCategorySerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carCategorySearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarBrandSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carBrandSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getCarSubTypeBrandSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/carBrandSubTypeSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getCostEmpolyeeById(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/costEmployIdSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getTravelDataById(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/travelIdSearch"+serachTerm,{headers: this.setHeaders()})
  }

  getCostCenterSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/costCenterSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getDriverSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/driverSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  getBookingSerach(serachTerm):Observable<any>{
    return this.authService.process("GET","masterdata/bookingSearch/"+serachTerm,{headers: this.setHeaders()})
  }

  saveCompany(serachTerm):Observable<any>{
    return this.authService.process("POST","masterdata/addCompany/"+serachTerm,{headers: this.setHeaders()})
  }

}
