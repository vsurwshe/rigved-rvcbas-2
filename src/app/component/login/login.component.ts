import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/service/login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading;

  constructor(
    private loginService:LoginService, 
    private appComponent: AppComponent,
    private router:Router
  ){  this.loading=false; }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".toggle-password").click(function() {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
        input.attr("type", "text");
        } else {
        input.attr("type", "password");
        }
    });
    });
  }

  // this method will used for the calling onclick of login button
  loginUser(data){
    this.loading=true;
    this.loginService.loginUser({...data, "deviceToken": ""}).subscribe(
      response=>{
        const { token }=response.tokenDto
        this.loading=false;
        this.loginService.saveToken(token);
        this.loginService.successFullMessage("Successfully Login....!");
        setTimeout(()=>{
          this.router.navigateByUrl("/managetrip");
          this.appComponent.ngOnInit();  
        },500)
      },
      error=>{ 
        this.loading=false;
        this.loginService.errorMessage("Invalid or Something went wrong");
      });
  }

}
