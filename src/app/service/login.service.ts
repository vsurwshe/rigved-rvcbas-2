import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService:AuthService) { }

  loginUser(username,password){
      this.authService.process("POST","public/signIn/",{
        body: {
          userName: username,
          password: password
        }
      })
      .subscribe(
        response =>{ console.log("Data ",response)},
        error =>{ console.error("Error ",error); }
      )
  }

  getToken(){

  }

  saveToken(){

  }

}
