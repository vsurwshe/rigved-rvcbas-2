import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private authService:AuthService, private loginService:LoginService) { }

  setHeaders(){
    return new HttpHeaders({
       "Content-Type":"application/json",
       "Authorization": this.loginService.getToken()
     });
  }

  getBookingDetailsById(bookingId):Observable<any>{
    return this.authService.process("GET","booking/getBooking/"+bookingId,{headers: this.setHeaders()})
  }

  closeBookingTripById(bookingId):Observable<any>{
    return this.authService.process("GET","booking/closeTrip/"+bookingId,{headers: this.setHeaders()})
  }
}
