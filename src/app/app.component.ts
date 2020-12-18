import { Component } from '@angular/core';
import '@fortawesome/fontawesome-free/js/all.js';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RV Cabs Rental';
  loading= false;
  token;
  constructor(private loginService:LoginService){}

  public ngOnInit(): void {
    this.token= (this.loginService.getToken() !== null && this.loginService.getToken() !=="") ? true: false;
  }

  get checkPrivateRoute(){
    if( location.pathname == "/forgotPass" || 
        location.pathname == "/privacy" || 
        location.pathname == "/help" ||
        location.pathname == "/terms" 
    ){
      return true;
    }else{
      return false;
    }
  }

}
