import { Component, OnInit } from '@angular/core';
import { appRoutes, routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  routesArray;
  
  constructor() {
    this.routesArray = routes;
  }

  ngOnInit(): void {
  }

}
