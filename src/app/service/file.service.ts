import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private loginService:LoginService, private authService: AuthService) { }

  setHeaders(){
    return new HttpHeaders({
       "Content-Type":"application/json",
       "Authorization": this.loginService.getToken()
     });
   }
   
  postFile(fileBodyData): Observable<any>{
    return this.authService.process("POST","file/upload/",{headers: this.setHeaders(),  body:fileBodyData})
  }

  getfile(fileUrl):Observable<any>{
    return this.authService.process("GET","file/getFile?path="+fileUrl,{headers: this.setHeaders(),responseType: 'blob'})
  }

}
