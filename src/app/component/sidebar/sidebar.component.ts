import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { appRoutes, sideBarRoutes } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('logoutclose') logoutclose: ElementRef;
  
  // required variables
  routesArray;
  logout;
  
  constructor(private loginService:LoginService, private appComponent:AppComponent) {
    this.routesArray = sideBarRoutes;
    this.logout=false;
  }

  ngOnInit(): void {
  }


  // this checking user type is customer or not
  get checkCustomerRoute(){
    if(this.loginService.getUserType() == "CUSTOMER"){
      return true;
    }else{
      return false;
    }
  }


  setLogout(){ this.logout=true;}

  callLogout(){
    this.loginService.clearStorage();
    this.logoutclose.nativeElement.click();
    this.appComponent.ngOnInit();
  }

}
