import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  RequestUrl='http://103.224.240.187:9001/';

  constructor(private httpClient:HttpClient) { 

  }

  public process(requestMethod,requestURL,requestOption){
    return this.httpClient.request(requestMethod,this.RequestUrl+requestURL,requestOption);
  }
}
