import { Component, OnInit } from '@angular/core';
import { appRoutes, sideBarRoutes } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  routesArray;
  
  constructor(private loginService:LoginService, private appComponent:AppComponent) {
    this.routesArray = sideBarRoutes;
  }

  ngOnInit(): void {
  }

  userLogout(){
    console.log("Calling User Logout")
    this.loginService.clearStorage();
    this.appComponent.ngOnInit();
  }

}
