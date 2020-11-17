import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService:AuthService) { }

  // this method will calling login api
  loginUser(loginData):Observable<any>{
      return this.authService.process("POST","public/signIn/",{ body: loginData })
  }

  // this method will used for the get token
  getToken(){
    const tokenData = sessionStorage.getItem('AUTH')
    return JSON.parse(tokenData)
  }

  // this method will used for the saving token
  saveToken(tokenData){
    sessionStorage.setItem('AUTH', JSON.stringify(tokenData));
  }

  // this method will used for the clear the session storage
  clearStorage(){
    sessionStorage.removeItem('AUTH');
  }

  // this method will used for showing success messgae
  successFullMessage(message){
    $.iaoAlert({
      msg: message,
      type: "success",
      mode: "dark",
    })
  }

  // this method will used for showing error messgae
  errorMessage(message){
    $.iaoAlert({
      msg: message,
      type: "error",
      mode: "dark",
    })
  }

}
