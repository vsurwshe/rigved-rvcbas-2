import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ManageTripService {

  constructor(private authService:AuthService, private loginService:LoginService) { }

  setHeaders(){
   return new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization": this.loginService.getToken()
    });
  }

  loadTrips(firstIndex,lastIndex):Observable<any>{
    return this.authService.process("GET","booking/bookingByAccountIdFrAdmin/"+firstIndex+"/"+lastIndex,{headers: this.setHeaders()})
  }

  getFinishedTrip(firstIndex,lastIndex):Observable<any>{
    return this.authService.process("GET","booking/finishedTripByDriverFrAdmin/"+firstIndex+"/"+lastIndex,{headers: this.setHeaders()})
  }

  getFeedbackOfTrip(tripId):Observable<any>{
    return this.authService.process("GET","trip/getFeedback/"+tripId,{headers: this.setHeaders()})
  }

  saveTrip(tripData):Observable<any>{
    return this.authService.process("POST","booking/bookTrip/",{headers: this.setHeaders(), body:tripData})
  }

  getTripDetails(tripId):Observable<any>{
    return this.authService.process("GET","trip/getTripCoordinates/"+tripId,{headers: this.setHeaders()})
  }

}
